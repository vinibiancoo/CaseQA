describe('Todo List', () => {

  beforeEach(() => {
    cy.visit('https://todolist-qa-test.going2.com.br/');
    cy.get('ul li').each(($el, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($el).contains('Delete').click().wait(500); 
      } else {
        cy.wrap($el).contains('Delete').click().wait(500); 
      }
    });
  });

  it('deve criar uma nova task', () => {
    cy.get('input[placeholder="Add a new todo"]').type('Nova tarefa');
    cy.get('button').contains('Add').click();
    cy.get('ul').should('contain', 'Nova tarefa');
  });

  it('deve deletar uma task', () => {
    cy.get('input[placeholder="Add a new todo"]').type('Tarefa para deletar');
    cy.get('button').contains('Add').click();
    cy.get('button').contains('Delete').click();
    cy.get('ul').should('not.contain', 'Tarefa para deletar');
  });

  it('deve marcar como concluido uma tarefa', () => {
      cy.get('input[placeholder="Add a new todo"]').type('Tarefa a ser concluída');
      cy.get('button').contains('Add').click().wait(500);
      cy.get('li').contains('Tarefa a ser concluída').parent().find('button').contains('Complete').click();
      cy.get('li').contains('Tarefa a ser concluída').parent().find('button').contains('Undo').should('be.visible');
    });

  it('deve desmarcar a tarefa como concluido', () => {
    cy.get('input[placeholder="Add a new todo"]').type('Tarefa concluída');
    cy.get('button').contains('Add').click();
    cy.get('button').contains('Complete').click();
    cy.get('button').contains('Undo').click();
    cy.get('li').contains('Tarefa concluída').should('not.have.class', 'completed');
  });

  it('deve manter as tasks quando reiniciar a pagina', () => {
    const task = 'Tarefa persistente';
    cy.get('input[placeholder="Add a new todo"]').type(task);
    cy.get('button').contains('Add').click();
    cy.reload();
    cy.get('ul').should('contain', task);
  });
});
