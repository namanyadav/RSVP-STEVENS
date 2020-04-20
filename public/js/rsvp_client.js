function create_new_event(el, e) {
    // alert(`trigger ${e.target}`)
    // e.preventDefault();
    // alert(`creating new event; ${$(el).data('action')}`)
    // $(el).submit()
    $.ajax({
        url: '/events/create',
        type: 'POST',
        data: $(el).serialize(),
        success: function (res) {
            alert('succ')
        },
        error: function (err) {
            alert('fail')
        }
    });
    return false
}
semantic = {};
semantic.button = {};

// ready event
semantic.button.ready = function() {

    // selector cache
    var
        $buttons = $('.ui.buttons .button'),
        $toggle  = $('.main .ui.toggle.button'),
        $button  = $('.ui.button').not($buttons).not($toggle),
        // alias
        handler = {

            activate: function() {
                $(this)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                ;
            }

        }
    ;

    $buttons
        .on('click', handler.activate)
    ;


    $toggle
        .state({
            text: {
                inactive : 'Vote',
                active   : 'Voted'
            }
        })
    ;

};
function togglePricing(el, pricing) {
    $(el).siblings('.ui.button').removeClass('active');
    $(el).addClass('active');
    let pricingPastValue = $(new_event_form).form('get value', 'pricing');
    // let allValues = $(new_event_form).form('get values');
    if ((!pricingPastValue || pricingPastValue=='free') && pricing == 'free') {
        $(new_event_form).form('set value', 'pricing', 'free');
        validateField('pricing');
        return;
    }
    if(pricing == 'free') {
        $('.event_cost').hide();
        $(new_event_form).form('set value', 'pricing', 'free');
        // $(new_event_form).find('input[name="pricing"]').val('free');
    //    remove form validation for cost
        removeCostValidationRule();
    } else {
        $('.event_cost').show();
        // $(new_event_form).find('input[name="pricing"]').val('paid');
        $(new_event_form).form('set value', 'pricing', 'paid');
    //    add form validation for cost
        addCostValidationRule();
    }
    validateField('pricing');
}
var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};
function reveal_next() {
    let $pages = $('.ui.reveal_page .content');
    let pageCount = $pages.length;
    let nextPage = pageNo + 1 <= pageCount ? pageNo + 1 : pageNo + 1 - pageCount;
    $($pages[pageNo-1]).transition('move');
    // $($pages[pageNo-1]).removeClass('visible').addClass('hidden');
    // $($pages[nextPage-1]).removeClass('hidden').addClass('visible');
    $($pages[nextPage-1]).removeClass('hidden').show();
    pageNo = nextPage;
}
function reveal_prev() {
    let $pages = $('.ui.reveal_page .content');
    let pageCount = $pages.length;
    let prevPage = pageNo - 1 > 0 ? pageNo - 1 : pageCount;
    $($pages[pageNo-1]).transition('move');
    // $($pages[pageNo-1]).removeClass('visible').addClass('hidden');
    $($pages[prevPage-1]).removeClass('hidden').show();
    pageNo = prevPage;
}
var pageNo=1;
function init_new_event_form(form_selector) {
    $(form_selector).submit(function (event) {
        event.preventDefault();
        create_new_event('#new_event_form', event);
        return false;
    })
}
function config_form_validation() {
    $('#new_event_form')
        .form({
            inline: true,
            // on: 'blur',
            fields: {
                category: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please select a category'
                        }
                    ]
                },
                title: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a title'
                        }
                    ]
                },
                sDate: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a start date/time'
                            // prompt : '{name} is set to "{value}" that is totally wrong. It should be {ruleValue}'
                        }
                    ]
                },
                eDate: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter an end date/time'
                            // prompt : function(value) {
                            //     if(value == 'dog') {
                            //         return 'I told you to put cat, not dog!';
                            //     }
                            //     return 'That is not cat';
                            // }
                        }
                    ]
                },
                capacity: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter the capacity'
                        },
                        {
                            type    : 'integer',
                            prompt  : 'Capacity should be an integer'
                        }
                    ]
                },
                country: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a country'
                        }
                    ]
                },
                state: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a state'
                        }
                    ]
                },
                stAddr: {
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter the street address'
                        }
                    ]
                },
                pricing: {
                    rules: [
                        {
                            type    :   'empty',
                            prompt  :   'Please select a pricing type'
                        }
                    ]
                }
            }
        })
}
function addCostValidationRule() {
    $(new_event_form)
        .form('add rule', 'cost', {
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Please enter the ticket cost'
                }
            ]
        });
    fieldsInTab[2].push('cost');
}
function removeCostValidationRule() {
    $(new_event_form)
        .form('remove fields', ['cost']);
    fieldsInTab[2].splice(fieldsInTab[2].indexOf('cost'));
}
function addValidationRuleDemo() {
    $('.add.example .ui.form')
        // adding longform
        .form('add rule', 'gender', {
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Entering your gender is necessary'
                }
            ]
        })
        // adding shorthand
        .form('add rule', 'password', ['empty', 'minLength[5]'])
    ;
}
function removeValidationRuleDemo() {
    $('.add.example .ui.form')
        // removing multiple at once
        .form('remove fields', ['gender', 'password'])
}
function removeFilter(el) {
    $(el).closest('.badge').remove();
    getFilteredResults();
}
let selected_filters = '#selected_filters';
let cat_labels = {
    music: 'Music',
    artsnculture: 'Arts & Culture',
    sportsnwellness: 'Sports & Wellness',
    foodndrinks: 'Food & Drinks'
}
function clearFilters() {

}
function getCurrentFilters() {
    let applied_filters = {
        cat: []
    }
    let filter_list = $(selected_filters).find('.badge');
    for(let i=0; i<filter_list.length; i++) {
        let filter_val = $(filter_list[i]).data('filter-val')
        applied_filters.cat.push(filter_val);
    }
    return applied_filters;
}
function getFilteredResults() {
    let selectedFilters = getCurrentFilters();
    let catsFilter = `cats=[${selectedFilters.cat.join(',')}]`;
    // alert(`get retulsts for ${selectedFilters.cat}`)
    $.ajax({
        url: `/search?${catsFilter}`,
        type: 'get',
        success: function (res) {
            // alert('search susccess');
            $('#event-panel').html(res)
        },
        error: function (err) {
            alert('search fail')
        }
    })
}
function addFilter(filter_name, filter_val) {
    if(filter_name == 'cat') {
        if(filter_val == 'all') {
            alert(`allfilters: ${getCurrentFilters().cat}`)
        } else {
            if($.inArray(filter_val, getCurrentFilters().cat) == -1) {
                // Retrieve the template data from the HTML (jQuery is used here).
                var template = $('#badge-template').html();
                // Compile the template data into a function
                var templateScript = Handlebars.compile(template);
                var context = { "filter-val" : filter_val, "filter-label" : cat_labels[filter_val] };
                var html = templateScript(context);
                // Insert the HTML code into the page
                $(selected_filters).append(html);
                getFilteredResults();
            } else {
                // filter already applied. do nothing.
                // alert('already added to filters');
            }

        }
    }

}
function test_fun() {
    $('#new_event_form').form('validate form');
}

$(document).ready(function () {

    if($('.ui.checkbox').length)    $('.ui.checkbox').checkbox();
    if($('.ui.dropdown').length)    $('.ui.dropdown').dropdown();
    $('.buttongrp .ui.button.toggle').click(function (){
        $('.buttongrp .ui.button.toggle').removeClass('active');
        $(this).addClass('active');
        $(new_event_form).form('set value', 'category', $(this).data('category'))
        validateField('category')
    });
    if($('.ui.calendar').length)    $('.ui.calendar').calendar();
    // init_new_event_form('#new_event_form')
    // alert('definging submit event for new_event_form')
    if($('#new_event_form').length) {
        $('#new_event_form').submit(function (event) {
            event.preventDefault();
            // alert("submit stopped");
            // return false;
            create_new_event('#new_event_form', event)
        });
        config_form_validation()
    }

})