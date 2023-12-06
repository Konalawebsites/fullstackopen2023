describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Testi Mees',
      username: 'testimees',
      password: 'salainen'
    }

    const user2 = {
      name: 'Testi Mees2',
      username: 'testimees2',
      password: 'salainen'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown by default', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {

    it('user login fails when wrong password given', function () {
      cy.get('#username').type('testimees')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('username and/or password wrong')
    })

    it('user can login with correct password', function () {
      cy.get('#username').type('testimees')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('testimees logged in')
    })
  })

  describe('When logged in', function () {

    beforeEach(function () {
      cy.login({ username: 'testimees', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.get('#add_blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#add').click()
      cy.contains('"testTitle" by testAuthor')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'blog one', author: 'blog one author', url: 'blog one url' })
        cy.createBlog({ title: 'blog two', author: 'blog two author', url: 'blog two url' })
        cy.createBlog({ title: 'blog three', author: 'blog three author', url: 'blog three url' })
      })


      it('A blog can be liked', function () {
        cy.get('#view_more').click()
        cy.contains('likes: 0')
        cy.get('#like').click()

        cy.contains('likes: 1')
      })

      it('A blog can be deleted', function () {
        cy.contains('blog one')
          .get('#view_more').click()
          .get('#delete').click()
        cy.get('blog one').should('not.exist')
      })

      it('Delete button visible for blogs creator only', function () {
        cy.get('#log_out').click()
        cy.login({ username: 'testimees2', password: 'salainen' })
        cy.contains('blog one')
          .get('#view_more').click()
          .get('#delete').should('not.exist')
      })

      it('and blogs are ordered in a decending order', function () {
        cy.contains('blog one').parent().contains('view').click()
        cy.contains('blog one').parent().contains('like').click()

        cy.contains('blog two').parent().contains('view').click()
        cy.contains('blog two').parent().contains('like').click()
        cy.wait(500)
        cy.contains('blog two').parent().contains('like').click()

        cy.contains('blog three').parent().contains('view').click()
        cy.contains('blog three').parent().contains('like').click()
        cy.wait(500)
        cy.contains('blog three').parent().contains('like').click()
        cy.wait(500)
        cy.contains('blog three').parent().contains('like').click()

        cy.get('.blogContent').eq(0).should('contain', 'blog three')
        cy.get('.blogContent').eq(1).should('contain', 'blog two')
        cy.get('.blogContent').eq(2).should('contain', 'blog one')
      })

    })
  })
})