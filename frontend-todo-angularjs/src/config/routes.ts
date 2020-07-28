import {app} from '../app';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routeConfig(
    $stateProvider: IStateProvider, 
    $urlRouterProvider: IUrlRouterProvider
) {
    $stateProvider
        .state('todo', {
            url: '/',
            controller: 'TodoController as ctrl',
            templateUrl: 'todo/index.html'
        })
    
    $urlRouterProvider.otherwise('/');
}

app.config(routeConfig);