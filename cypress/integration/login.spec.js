describe('Login flow', function() {
    it('works', function() {
        cy.visit('http://localhost:3001/login/');

        cy.contains('Login');
        cy.contains('Forgot password');
        cy.contains('Sign up');

        cy.url().should('include', '/login');

        cy.get('#sign-email')
            .type('admin@akwuh.me')
            .should('have.value', 'admin@akwuh.me');

        cy.get('#sign-password')
            .type('admin')
            .should('have.value', 'admin');

        cy.get('button[type="submit"]').click();

        cy.contains('Name');
        cy.contains('Offset');
        cy.contains('City');
    });

    it('validates email / password', function() {
        cy.visit('http://localhost:3001/login/');

        cy.get('#sign-email')
            .type('admin@akwuh.m')
            .should('have.value', 'admin@akwuh.m');

        cy.get('button[type="submit"]').click();

        cy.contains('email format is invalid');

        cy.get('#sign-password')
            .type('adm')
            .should('have.value', 'adm');

        cy.get('button[type="submit"]').click();

        cy.contains('password must be at least 4 characters');
    });

    it('redirects')
});
