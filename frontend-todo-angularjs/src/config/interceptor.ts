import { IHttpProvider, IHttpResponse } from 'angular';
import { app } from '../app';
import { AdonisTodoService } from '../todo/adonis-todo-service';

function interceptor(
    $httpProvider: IHttpProvider
) {
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}

app.factory('authHttpResponseInterceptor',['$q','$location', '$injector', function($q, $location, $injector) {

    return {
        response: function(response: IHttpResponse<any>) {
            const service = $injector.get('AdonisTodoService') as AdonisTodoService

            if (response.config.method != 'GET') {
                service.handleSuccess(response.data.message)
            }

            return response || $q.when(response);
        },
        responseError: function(rejection) {
            const service = $injector.get('AdonisTodoService') as AdonisTodoService
            
            service.handleError(rejection.data.error)
            
            return $q.reject(rejection);
        }
    };
}])
.config(interceptor);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);