'use strict';

function onInit() {
    renderProjects()
}

function renderProjects() {
    var projects = getProjs();
    var strHtmls = projects.map(function (project) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item" onclick="onOpenModal('${project.id}')">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid thumb" src="img/portfolio/${project.id}-thumb.png" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${project.name}</h4>
                <p class="text-muted">${project.title}</p>
            </div>
        </div>
        `
    }).join('')
    document.querySelector('.projects').innerHTML = strHtmls
}

function renderModal(proj) {
    var strHtml = `
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                    <div class="lr">
                        <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <h2>${proj.name}</h2>
                                <p class="item-intro text-muted">${proj.title}</p>
                                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png" alt="">
                                <p>${proj.desc}</p>
                                <ul class="list-inline">
                                    <li>Date: September 2020 </li>
                                    <li>Client: Coding Academy</li>
                                    <li>Category: ${proj.labels}</li>
                                </ul>
                                  <button class="btn btn-primary btn-outside" data-dismiss="modal" type="button" onclick="onVisitProj('${proj.id}')">
                                   <i class="fa fa-eye"></i>
                                    View Project</button>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                                    <i class="fa fa-times"></i>
                                    Close Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    document.querySelector('.modals').innerHTML = strHtml
}

function onOpenModal(projId) {
    var proj = getProjById(projId)
    renderModal(proj);
}

function onSendMail() {
    var elSubject = document.querySelector('.subject');
    var elMessage = document.querySelector('.message');
    var subject = elSubject.value;
    var message = elMessage.value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=haleli.am@gmail.com&su=${subject}&body=${message}`)
}

function onVisitProj(projId) {
    var proj = getProjById(projId)
    window.open(`${proj.url}`)
}