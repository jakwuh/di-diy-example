describe('Zones flow', function () {
    it('adds new', function () {
        cy.visit('http://localhost:3001/login/');

        cy.get('#sign-email').type('admin@akwuh.me');

        cy.get('#sign-password').type('admin');

        cy.get('button[type="submit"]').click();

        const city = 'city ' + Math.random() + Math.random();
        const name = 'name ' + Math.random() + Math.random();

        cy.get('#home-zone-edit-name').type(name);
        cy.get('#home-zone-edit-city').type(city);
        cy.contains('+00:00').click();
        cy.wait(200);
        cy.contains('+01:00').click();
        cy.contains('Save').click();

        cy.get('#home-zone-edit-name').should('have.value', '');
        cy.get('#home-zone-edit-city').should('have.value', '');

        cy.contains('+01:00');
        cy.contains(name);
        cy.contains(city);

        cy.contains(name).click();
        cy.contains('Save');
        cy.contains('Delete');
        cy.contains('Cancel').click();
        cy.contains(name).click();
        cy.contains('Delete').click();
    });
});
