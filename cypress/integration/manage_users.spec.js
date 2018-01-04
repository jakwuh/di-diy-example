describe('Manage users flow', function() {
    it('works', function() {
        cy.visit('http://localhost:3001/login/');

        cy.get('#sign-email').type('admin@akwuh.me');

        cy.get('#sign-password').type('admin');

        cy.get('button[type="submit"]').click();

        cy.contains('Offset');

        cy.visit('http://localhost:3001/manage-users/');

        const email = 'city' + Math.random() + Math.random() + '@akwuh.me';
        const loginAttempts = Math.round(Math.random() * 10);

        cy.get('#manage-users-email')
            .type('admin@akwuh.me')
            .should('have.value', 'admin@akwuh.me');

        cy.contains('Save').click({force: true});

        cy.get('#manage-users-email')
            .should('have.value', 'admin@akwuh.me');

        cy.get('#manage-users-email')
            .type('{backspace}'.repeat(30));

        cy.get('#manage-users-email')
            .type(email)
            .should('have.value', email);

        cy.get('#manage-users-login-attempts')
            .type(loginAttempts)
            .should('have.value', '0' + loginAttempts);

        cy.contains('Save').click();

        cy.get('#manage-users-email').should('have.value', '');
        cy.get('#manage-users-login-attempts').should('have.value', '0');
        cy.contains(email);
        cy.contains(loginAttempts);

        cy.contains('user@akwuh.me').click();
        cy.contains('Cancel').click();
    });
});
