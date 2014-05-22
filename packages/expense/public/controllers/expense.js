'use strict';

angular.module('mean.expense').controller('ExpenseController', ['$scope', '$http', '$stateParams', '$location', 'Global', 'Expense',
    function($scope, $http, $stateParams, $location, Global, Expense) {
        $scope.global = Global;
        $scope.package = {
            name: 'expense'
        };

        $scope.date = new Date();
        $scope.excurrency = 'KRW';

        $scope.create = function() {
            var expense = new Expense({
                date: this.date,
                account: this.account,
                amount: this.amount,
                currency: this.currency,
                receipt: this.receipt,
                comment: this.comment,
                excurrency: this.excurrency,
                exrate: this.exrate,
                exchanged: this.exchanged,
                confirm: this.confirm
            });
            expense.$save(function(response) {
                $location.path('expenses/' + response._id);
            });
        };

        $scope.remove = function(expense) {
            if (expense) {
                expense.$remove();

                for (var i in $scope.expenses) {
                    if ($scope.expenses[i] === expense) {
                        $scope.expenses.splice(i, 1);
                    }
                }
            }
            else {
                $scope.expense.$remove();
                $location.path('expenses');
            }
        };

        $scope.update = function() {
            var expense = $scope.expense;
            // if (!expense.updated) {
            //     expense.updated = [];
            // }
            // expense.updated.push(new Date().getTime());

            expense.$update(function() {
                $location.path('expenses/' + expense._id);
            });
        };

        $scope.find = function() {
            Expense.query(function(expenses) {
                $scope.expenses = expenses;
            });
        };

        $scope.findOne = function() {
            Expense.get({
                expenseId: $stateParams.expenseId
            }, function(expense) {
                $scope.expense = expense;
            });
        };

        $scope.calcExchanged = function(expense) {
            // var expense = $scope.expense;
            expense = expense || this;

            if(!expense.date || !expense.currency || !expense.amount || !expense.excurrency) {
                expense.exchanged = null;
                expense.exrate = null;

                return;
            }

            var url = '/currencies/rate?date=' 
                + new Date(expense.date).toISOString().substr(0,10)
                + '&from=' + expense.currency
                + '&to=' + expense.excurrency;

            $http.get(url).success(function(rate) {
                expense.exrate = parseFloat(rate.rate);
                expense.exchanged = expense.amount * expense.exrate;
            }).error(function(data, status, headers, config) {
                console.log('error', data);
            });
        };

        // For Calendar Popup
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $http.get('/accounts').success(function(accounts) {
            $scope.accounts = accounts;
        });

        $http.get('/currencies').success(function(currencies) {
            $scope.currencies = currencies;
        });

        $http.get('/receipts').success(function(receipts) {
            $scope.receipts = receipts;
        });

        $scope.getReceiptDesc = function(code) {
            if(!$scope.receipts)
                return code;
            for(var i = 0;i < $scope.receipts.length;i++) {
                var receipt = $scope.receipts[i];
                if(receipt.code === code)
                    return receipt.desc;
            }
        }

        $scope.getAccountDesc = function(code) {
            if(!$scope.accounts)
                return code;
            for(var i = 0;i < $scope.accounts.length;i++) {
                var account = $scope.accounts[i];
                if(account.code === code)
                    return account.desc;
            }
        }
    }
]);
