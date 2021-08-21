$('.dark-overlay').show();
$('.careers-section').css("min-height","1200px");

function loadJobs() {
    $('#data').empty();
    var jobsURL = "https://portalapi.mwam.com/jobs/?location="+$("#location").val()+"&department="+$("#department").val()
    $.getJSON(jobsURL)
        .done(function (data) {
            if ( $(data.jobs).length > 0 ) {
                $.each(data.jobs, function (i, job) {
                    $('<tr class="career-post"><td class="title">' + job.title + '</td><td class=" table-department">' + job.department + '</td><td class=" table-location">' + job.location + '</td><td><a href="/single-position/#' + job.id + '" class="button">Explore</a></td></tr>').appendTo("#data");
                });
            } else {
                $('<td colspan="4" style="padding:2em;" class="title noresults">There are no positions that match these options. </td>').appendTo("#data");
            }
        })
        .fail(function() {
            $('<td colspan="4" style="padding:2em;" class="title noresults">There are no positions open. </td>').appendTo("#data");
        });
    $('.dark-overlay').hide();

}

function loadLocations() {
    $('#data').empty();
    $.getJSON("https://portalapi.mwam.com/jobs/locations")
        .done(function (data) {
            $.each(data.locations, function (i, location) {
                $('<option value="'+location.id+'">'+location.name+'</option>').appendTo("#location");
            });
        });
}


function loadDepartments() {
    $('#data').empty();
    $.getJSON("https://portalapi.mwam.com/jobs/departments")
        .done(function (data) {
            $.each(data.departments, function (i, department) {
                $('<option value="'+department.id+'">'+department.name+'</option>').appendTo("#department");
            });
        });
}



function loadJob(id) {
    $('#data').empty();
    var jobURL = "https://portalapi.mwam.com/jobs/"+id;
    $.getJSON(jobURL)
        .done(function (job) {
            if ( job.title ) {
                document.title = job.title + " - Marshall Wace";
                $('h1#data_title').html(job.title);
                $('p#data_department_location').html(job.department + "<span></span>" + job.location);
                $('div#data_job').html(job.job);
                $('div#data_role').html($('<textarea />').html(job.role).text());
                // $('div#data_role').html(job.role);
                $('a#data_apply, a#data_apply2').attr("href", job.link);
                $('.dark-overlay').hide();
            } else {
                document.location = "/404";
            }

        });
}

$("#location").change(function() {
    loadJobs();
});

$("#department").change(function() {
    loadJobs();
});



