/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
    "name" : "Camille Frisquet",
    "role" : "Front-end Web Developper",
    "contacts" : {
                "mobile" : "000000000",
                "email" : "camille.frisquet@gmail.com",
                "github" : "c-frisquet",
                "twitter" : "",
                "location" : "Littleport, UK"
                },
    "welcomeMessage" : "Hey welcome",
    "skills" : ["Python", "HTML/CSS", "Javascript", "JQuery"],
    "biopic" : "images/beardfry.jpg",
    "display" : function() {
        var idHeader = $("#header") ;
        var idContact = $("#topContacts");
        var idFooter= $("#footerContacts");

        idHeader.append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
        idHeader.prepend(HTMLheaderRole.replace("%data%", bio.role));
        idHeader.prepend(HTMLheaderName.replace("%data%", bio.name));
        idHeader.prepend(HTMLbioPic.replace("%data%", bio.biopic));

        for (var index in bio.contacts) {
            if (bio.contacts[index] != "") {
                var contactEntry = HTMLcontactGeneric.replace("%contact%", index).replace("%data%", bio.contacts[index]);
                idContact.append(contactEntry);
                idFooter.append(contactEntry);
            }
        }

        if (bio.skills != []) {
            idHeader.append(HTMLskillsStart);
            var idSkill = $("#skills");
            for (var i = 0; i < bio.skills.length; i++) {
            idSkill.append(HTMLskills.replace("%data%", bio.skills[i]));
            }
        }
    }
};


var work = {
    "jobs" :
        [
            {
                "employer" : "Merry Monk",
                "title" : "Chef",
                "location" : "Isleham, UK",
                "dates" : "2015-2016",
                "description" : "Part of a team. Cooking the main dishes"
            },
            {
                "employer" : "Campanile",
                "title" : "Chef",
                "location" : "Annecy, France",
                "dates" : "2014",
                "description" : "Solo chef"
            },
            {
                "employer" : "Rockyou",
                "title" : "QA tester",
                "location" : "Wilmslow, UK",
                "dates" : "2012",
                "description" : "Regression testing of facebook games"
            }
        ],
    "display" : function() {
        work.jobs.forEach(function (job){
                 $("#workExperience").append(HTMLworkStart);
                 var lastEntry = $(".work-entry:last") ;
                 lastEntry.append(HTMLworkEmployer.replace("%data%", job.employer) + HTMLworkTitle.replace("%data%", job.title));
                 lastEntry.append(HTMLworkDates.replace("%data%", job.dates));
                 lastEntry.append(HTMLworkLocation.replace("%data%", job.location));
                 lastEntry.append(HTMLworkDescription.replace("%data%", job.description));
        });
    }
};

var education = {
    "schools" : [
        {
            "name" : "Lycée Robespierre",
            "location" : "Arras, France",
            "degree" : "Equivalence",
            "major" : ["Engineering Physics and Chemistry"],
            "dates" : "2007-2009",
            "url" : "http://www.lycee-robespierre.fr/"
        }
    ],
    "onlineCourses" : [
        {
            "title" : "Front-end Web Developper",
            "school" : "Udacity",
            "dates" : "2016",
            "url" : "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        }
    ],
    "display" : function() {
        var idEducation = $("#education");
         education.schools.forEach(function (school){
            idEducation.append(HTMLschoolStart);
            var idSchool = $(".education-entry:last");
            idSchool.append(HTMLschoolName.replace("#", school.url).replace("%data%", school.name));
            idSchool.append(HTMLschoolDegree.replace("%data%", school.degree));
            idSchool.append(HTMLschoolDates.replace("%data%", school.dates));
            idSchool.append(HTMLschoolLocation.replace("%data%", school.location));
            idSchool.append(HTMLschoolMajor.replace("%data%", school.major));
         });

        if (education.onlineCourses != []) {
            idEducation.append(HTMLonlineClasses);
            education.onlineCourses.forEach(function (course){
                idEducation.append(HTMLschoolStart);
                var idSchool = $(".education-entry:last");
                idSchool.append(HTMLonlineTitle.replace("%data%", course.title));
                idSchool.append(HTMLonlineSchool.replace("%data%", course.school));
                idSchool.append(HTMLonlineDates.replace("%data%", course.dates));
                idSchool.append(HTMLonlineURL.replace("%data%", course.url).replace("#", course.url));
            });
        }
    }
};


var projects = {
    "projects" : [
        {
        "title" : "Mockup to Article",
        "dates" : "2016",
        "description" : "Using HTML to render a mockup" ,
        "images" : ["https://github.com/c-frisquet/udacity-project/blob/master/project-portfolio/images/mockuptoarticle.jpg?raw=true"]
        },
        {
        "title" : "Animal Trading Card",
        "dates" : "2016",
        "description" : "Using HTML and CSS to render a card",
        "images" : ["https://github.com/c-frisquet/udacity-project/blob/master/project-portfolio/images/animal-card.jpg?raw=true"]
        },
        {
        "title" : "Portfolio",
        "dates" : "2016",
        "description" : "Using HTML and CSS to do a portfolio",
        "images" : ["https://github.com/c-frisquet/udacity-project/blob/master/project-portfolio/images/portfolio-mockup.jpg?raw=true"]
        }
    ],
    "display" : function() {
        projects.projects.forEach(function (project){
                $("#projects").append(HTMLprojectStart);
                var lastEntry = $(".project-entry:last") ;
                lastEntry.append(HTMLprojectTitle.replace("%data%", project.title));
                lastEntry.append(HTMLprojectDates.replace("%data%", project.dates));
                lastEntry.append(HTMLprojectDescription.replace("%data%", project.description));
                lastEntry.append(HTMLprojectImage.replace("%data%", project.images));
        });
    }
};


$("#main").prepend(internationalizeButton);

function inName(twoName) {
    var internationalName = twoName;
    var arrayName = internationalName.split(" ");
    arrayName[0] = arrayName[0].slice(0,1).toUpperCase() + arrayName[0].slice(1).toLowerCase();
    arrayName[1] = arrayName[1].toUpperCase();
    internationalName = arrayName[0] + " " + arrayName[1];
    return internationalName;
}

$("#mapDiv").append(googleMap);

bio.display();
work.display();
projects.display();
education.display();