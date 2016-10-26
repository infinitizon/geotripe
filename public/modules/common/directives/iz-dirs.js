/**
 * Created by ahassan on 10/26/16.
 */
'use strict';

/*
 * anchor-scroll - scroll to id directive
 */

function searchFilters() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var $filters = element.find('#filters');
            var templatesAvailable = element.find('.template', '.templates').not('.filter-chooser').length;

            element.find('#filter-add').on('click', function (e) {

                // Check if the button was pressed before selecting a filter
                if ($filters.find('.template:last .filter-type').val() === '') {
                    return;
                }

                // Find filters already in use
                var filterInUse = $filters
                    .children()
                    .map(function() {
                        return angular.element(this)
                            .children('.template')
                            .attr('class')
                            .match(/\b(template-.+?)\b/g)[0];
                    })
                    .get();

                // All the filters available are already in use
                if (filterInUse.length === templatesAvailable) {
                    return;
                }

                var $filterChooser = $('div.template.filter-chooser')
                    .clone()
                    .removeClass('filter-chooser')
                    .addClass('filter');

                // Remove filters already in use
                $filterChooser
                    .find('option[data-template-type]')
                    .filter(function() {
                        return filterInUse.indexOf(angular.element(this).data('template-type')) >= 0;
                    })
                    .remove();
                    $filterChooser.appendTo($filters);
            }).click();
            element.find('#filters').on('change', '.filter-type', function() {
                    var $this = angular.element(this)
                    var $filter = $this.closest('.filter');
                    var filterType = $this.find(':selected').data('template-type');

                    $('.qualifier', $filter).remove();
                    $('div.template.' + filterType)
                        .clone()
                        .addClass('qualifier')
                        .appendTo($filter);
                    $this.find('option[value=""]').remove();
                }).on('click', '.filter-remover', function() {
                    angular.element(this).closest('.filter').remove();
                });
        }
    };
}

angular.module('Geotripe')
    .directive('searchFilters', searchFilters);
