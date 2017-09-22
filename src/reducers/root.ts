function rootReducer(state, action){
    switch (action.type) {
    case 'GRAPH_CONTAINER_SET': {
        console.log('reducing')
        return {
            graphContainerSettings: 'a'
          };
    }
      
    default:
      return state;
    }
  }

  export {rootReducer};