describe('Manage zones flow', function() {
    it('works', function() {
        cy.visit('http://localhost:3001/login/');

        cy.get('#sign-email').type('admin@akwuh.me');

        cy.get('#sign-password').type('admin');

        cy.get('button[type="submit"]').click();

        cy.contains('Offset');

        cy.visit('http://localhost:3001/manage-zones/');

        const city = 'city ' + Math.random() + Math.random();
        const name = 'name ' + Math.random() + Math.random();

        cy.contains('Save').click({force: true});

        cy.get('#manage-zones-name')
            .type(name)
            .should('have.value', name);

        cy.get('#manage-zones-city')
            .type(city)
            .should('have.value', city);

        cy.get('#manage-zones-select-user')
            .click();

        cy.get('span[role="menuitem"]')
            .first()
            .click();


        cy.contains('Save').click();

        cy.get('#manage-zones-name').should('have.value', '');
        cy.get('#manage-zones-city').should('have.value', '');

        cy.contains(name);
        cy.contains(city);

        cy.contains(name).click();
        cy.contains('Cancel').click();
    });
});
