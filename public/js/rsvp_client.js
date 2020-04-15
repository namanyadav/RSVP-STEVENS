function create_new_event(el, e) {
    alert(`trigger ${e.target}`)
    e.preventDefault();
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