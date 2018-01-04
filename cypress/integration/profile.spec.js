describe('Profile flow', function () {
    it('works', function () {
        cy.visit('http://localhost:3001/login/');

        cy.get('#sign-email').type('admin@akwuh.me');

        cy.get('#sign-password').type('admin');

        cy.get('button[type="submit"]').click();

        cy.contains('Offset');

        cy.visit('http://localhost:3001/profile/');

        cy.contains('admin@akwuh.me');

        cy.contains('default_profile').click();

        cy.contains('Crop and');
    });
});
