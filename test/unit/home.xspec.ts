


describe('MyComponent', () => {
    let component;
    let service = new MockService();
  
    beforeEach(() => {
      service.firstName = undefined;
  
      component = StageComponent
        .withResources('src/component')
        .inView('<component></component>');
  
      component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();
        
        aurelia.container.registerInstance(Service, service);
      });
    });
  
    it('should render first name', done => {
      service.firstName = 'Bob';
  
      component.create(bootstrap).then(() => {
        const nameElement = document.querySelector('.first-name');
        expect(nameElement.innerHTML).toBe('Bob');
        
        done();
      });
    });

    afterEach(() => {
      component.dispose();
    });
  });