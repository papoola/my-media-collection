import type { Book } from '../support/types'

describe('Book', () => {
  let fixtures: {
    newBook: Book
    updatedBook: Book
  }

  beforeEach(() => {
    cy.fixture('book.json').then((data) => {
      fixtures = data
    })

    Cypress.on("uncaught:exception", (err) => {
      // Cypress and React Hydrating the document don't get along
      // for some unknown reason. Hopefully, we figure out why eventually
      // so we can remove this.
      // https://github.com/remix-run/remix/issues/4822#issuecomment-1679195650
      // https://github.com/cypress-io/cypress/issues/27204
      if (
        /hydrat/i.test(err.message) ||
        /Minified React error #418/.test(err.message) ||
        /Minified React error #423/.test(err.message)
      ) {
        return false
      }
    })
    
    // Clear localStorage before each test to ensure a clean state
    cy.clearLocalStorage()      
  })

  it('should navigate to new book page', () => {
    cy.visit('/books')
    cy.contains('Add New').click()
    cy.url().should('include', '/books/new')
    cy.contains('h1', 'New Book').should('be.visible')
  })

  it('should create a new book with valid data', () => {
    cy.visit('/books/new')
    
    const newBook = fixtures.newBook
    
    cy.get('#title').type(newBook.title)
    cy.get('#author').type(newBook.author)
    cy.get('#year').type(newBook.year.toString())
    cy.get('#rating').type(newBook.rating.toString())
    cy.get('#description').type(newBook.description)
    cy.get('#bolUrl').type(newBook.bolUrl)
    if (newBook.poster) {
      cy.get('#poster').type(newBook.poster)
    }
    newBook.genre.forEach(genre => {
      cy.get('#genre').select(genre)
    })

    // Submit the form
    cy.get('button[type="submit"]').click()

    // After submission, we should be redirected to the books list page
    cy.url().should('include', '/books')
    cy.url().should('not.include', '/new')
    
    // Verify the book appears in the list
    cy.contains(newBook.title).should('be.visible')
    
    // Verify the book has been added to localStorage
    cy.window().then((win) => {
      const books = JSON.parse(win.localStorage.getItem('books') || '[]')
      const createdBook = books.find((book: Book) => book.title === newBook.title)
      expect(createdBook).to.exist
      expect(createdBook.author).to.equal(newBook.author)
      expect(createdBook.year).to.equal(newBook.year)
      expect(createdBook.rating).to.equal(newBook.rating)
      expect(createdBook.description).to.equal(newBook.description)
      expect(createdBook.bolUrl).to.equal(newBook.bolUrl)
      expect(createdBook.poster).to.equal(newBook.poster)
      expect(createdBook.genre).to.have.members(newBook.genre)
    })
  })

  it('should edit an existing book', () => {
    cy.visit('/books/1')
    
    // Click the edit button
    cy.contains('Edit').click()
    
    // Verify we're on the edit page
    cy.url().should('include', `/books/1/edit`)
    
    // Clear existing fields and enter new data
    cy.get('#title').clear().type(fixtures.updatedBook.title)
    cy.get('#author').clear().type(fixtures.updatedBook.author)
    cy.get('#year').clear().type(fixtures.updatedBook.year.toString())
    cy.get('#rating').clear().type(fixtures.updatedBook.rating.toString())
    cy.get('#description').clear().type(fixtures.updatedBook.description)
    cy.get('#bolUrl').clear().type(fixtures.updatedBook.bolUrl)
    if (fixtures.updatedBook.poster) {
      cy.get('#poster').clear().type(fixtures.updatedBook.poster)
    }
    
    // Remove existing genres (click on each genre's remove button) by scanning DOM
    cy.get('button[aria-label="Remove genre"]').then($buttons => {
      // Get the count of buttons
      const count = $buttons.length
      
      // Use a for loop with cy.then() to handle asynchronous operations
      for (let i = 0; i < count; i++) {
        // Click the first button each time (the DOM updates after each click)
        cy.get('button[aria-label="Remove genre"]').first().click()
      }
    })
    
    // Add new genres
    fixtures.updatedBook.genre.forEach(genre => {
      cy.get('#genre').select(genre)
    })
    
    // Submit the form
    cy.get('button[type="submit"]').click()
    
    // After submission, we should be redirected to the books list page
    cy.url().should('include', '/books')
    cy.url().should('not.include', '/edit')
    
    // Verify the updated book appears in the list
    cy.contains(fixtures.updatedBook.title).should('be.visible')
    
    // Verify the book has been updated in localStorage
    cy.window().then((win) => {
      const books = JSON.parse(win.localStorage.getItem('books') || '[]')
      const updatedBook = books.find((book: Book) => book.id === 1)
      expect(updatedBook).to.exist
      expect(updatedBook.title).to.equal(fixtures.updatedBook.title)
      expect(updatedBook.author).to.equal(fixtures.updatedBook.author)
      expect(updatedBook.year).to.equal(fixtures.updatedBook.year)
      expect(updatedBook.rating).to.equal(fixtures.updatedBook.rating)
      expect(updatedBook.description).to.equal(fixtures.updatedBook.description)
      expect(updatedBook.bolUrl).to.equal(fixtures.updatedBook.bolUrl)
      expect(updatedBook.poster).to.equal(fixtures.updatedBook.poster)
      expect(updatedBook.genre).to.have.members(fixtures.updatedBook.genre)
    })
  })

  it('should delete a book', () => {
    cy.visit(`/books/1`)
    
    // Click the delete button
    cy.contains('Delete').click()
    
    // Confirm the deletion in the confirmation dialog
    // cy.find('button[type="submit"]').click()
    cy.contains('Confirm Delete').parent().get('button.btn-danger').first().click()
    
    // After deletion, we should be redirected to the books list page
    cy.url().should('include', '/books')
    cy.url().should('not.include', `/books/1`)
    
    // Verify the book no longer appears in the list
    cy.contains('The Disappearance of the Universe').should('not.exist')
    
    // Verify the book has been removed from localStorage
    cy.window().then((win) => {
      const books = JSON.parse(win.localStorage.getItem('books') || '[]')
      const deletedBook = books.find((book: Book) => book.id === 1)
      expect(deletedBook).to.not.exist
    })
  })
})
