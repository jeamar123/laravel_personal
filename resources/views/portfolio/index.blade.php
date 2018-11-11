<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-114115155-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-114115155-1');
    </script>

    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='-1'>
    <meta http-equiv='pragma' content='no-cache'>
    <title>Jeamar Libres - Portfolio</title>

    <link rel="shortcut icon" href="{{ asset('img/logo/jl-logo-blue.png') }}" type="image/ico">


    <!-- <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css"> -->
    <link rel="stylesheet" type="text/css" href="../css/fonts.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/portfolio/css/style.css">
    <link rel="stylesheet" type="text/css" href="../assets/portfolio/css/responsive.css">
    <link rel="stylesheet" type="text/css" href="../css/custom2.css">

    <link rel="stylesheet" type="text/css" href="../css/hover.css">
    <link rel="stylesheet" type="text/css" href="../css/animate.css">

  </head>
  <body >
    <div id="top-div"></div>

    <a href="#top-div" id="backTop-container">
      <div class="backTop-wrapper text-center">
        <i class="fa fa-angle-double-up font-20 color-white"></i>
      </div>
    </a>

    <div class="sidenav-dots-container">
      <ul class="sidenav-ul">
        <li class="active">
          <a href="#top-div">
            <span>Top</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
        <li>
          <a href="#expertise-container">
            <span>Expertise</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
        <li>
          <a href="#skillset-container">
            <span>Skills and Technologies</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
        <li>
          <a href="#web-proj">
            <span>Web Projects</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
        <li>
          <a href="#mobile-proj">
            <span>Mobile Projects</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
        <li>
          <a href="#footer-container">
            <span>Contact</span>
            <i class="fa fa-circle"></i>
            <i class="fa fa-circle-o"></i>
          </a>
        </li>
      </ul>
    </div>

    <div class="main-body-loader">
      <div class="loader"></div>
    </div>

    <div class="header-logo hvr-buzz">
      <img id="logo-white" src="../img/logo/jl-logo-tran-white.png">
      <img id="logo-black" src="../img/logo/jl-logo-tran-black.png" style="display: none">
    </div>

    <header id="header-container">
      
      <div class="header-content">
        <div class="header-box">
          <div class="header-user-image">
            <img src="../img/jeamar_avatar.jpeg">
            <!-- <img src="../img/user-512.png"> -->
          </div>

          <div class="user-name">
            <!-- <p class="hvr-buzz-out">Jhon Doe</p> -->
            <p class="hvr-buzz-out">Jeamar Libres</p>
          </div>

          <div class="user-skills">
            <p class="hvr-buzz-out">Full-Stack Web Developer &bull; Android Ionic Mobile Developer</p>
          </div>

          <div class="user-social">
            <div class="social hvr-hang">
              <a href="https://www.facebook.com/jeamarpol" target="_blank">
                <i class="fa fa-facebook"></i>
              </a>
            </div>
            <div class="social hvr-bob">
              <a href="https://plus.google.com/u/0/102140157793861755091" target="_blank">
                <i class="fa fa-google"></i>
              </a>
            </div>
            <div class="social hvr-hang">
              <a href="https://www.instagram.com/jmrplbrs/" target="_blank">
                <i class="fa fa-instagram"></i>
              </a>
            </div>
            <div class="social hvr-bob">
              <a href="https://twitter.com/jeamarpol" target="_blank">
                <i class="fa fa-twitter"></i>
              </a>
            </div>
            <div class="social hvr-hang">
              <a href="https://www.linkedin.com/in/jeamar-paul-libres-529263117/" target="_blank">
                <i class="fa fa-linkedin-square"></i>
              </a>
            </div>
            <div class="social hvr-bob">
              <a href="https://github.com/jeamar123" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="main-body-section">
    
      <div id="expertise-container" class="section-item expertise-container" >

        <div class="expertise wow fadeInRight" data-wow-delay=".5s">
          <div class="img-wrapper hvr-float">
            <i class="fa fa-magic"></i>
          </div>
          <div class="white-space-20"></div>
          <p class="expertise-title">PSD to HTML</p>
          <p class="expertise-desc">
            Writing HTML and CSS that utilizes the imagery you exported from Photoshop or other image editor. Many web companies have used PSD to HTML as a template for team workflows.
          </p>
        </div>

        <div class="expertise wow fadeInRight" data-wow-delay="1s">
          <div class="img-wrapper hvr-float">
            <i class="fa fa-code"></i>
          </div>
          <div class="white-space-20"></div>
          <p class="expertise-title">Web Development</p>
          <p class="expertise-desc">
            Build, Create, and Maintain websites. Includes aspects such as web design, web publishing, web programming, and database management.
          </p>
        </div>

        <div class="expertise wow fadeInRight" data-wow-delay="1.5s">
          <div class="img-wrapper hvr-float">
            <i class="fa fa-mobile"></i>
          </div>
          <div class="white-space-20"></div>
          <p class="expertise-title">Mobile Development</p>
          <p class="expertise-desc">
            Develop applications that includes set of processes and procedures involved in writing software for small, wireless computing devices such as smartphones or tablets.
          </p>
        </div>

      </div>

      <div id="skillset-container" class="section-item skillset-container" >

        <div class="skills-content">
          <div class="skills wow fadeInDownBig">
            <div class="img-wrapper">
              <img src="../img/techs/html.png">
            </div>
            <p>Html</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".1s">
            <div class="img-wrapper">
              <img src="../img/techs/css.png">
            </div>
            <p>Css</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".2s">
            <div class="img-wrapper">
              <img src="../img/techs/js.png">
            </div>
            <p>Javascript</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".3s">
            <div class="img-wrapper">
              <img src="../img/techs/bootstrap.png">
            </div>
            <p>Bootstrap</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".4s">
            <div class="img-wrapper">
              <img src="../img/techs/materialize.png">
            </div>
            <p>Materializecss</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".5s">
            <div class="img-wrapper">
              <img src="../img/techs/jquery.png">
            </div>
            <p>Jquery</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".6s">
            <div class="img-wrapper">
              <img src="../img/techs/angularjs.svg">
            </div>
            <p>Angularjs</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".7s">
            <div class="img-wrapper">
              <img src="../img/techs/github.png">
            </div>
            <p>Github</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay=".8s">
            <div class="img-wrapper">
              <img src="../img/techs/ionic.png">
            </div>
            <p>Ionic</p>
          </div>
          
        </div>
        <div class="skills-content">

          <div class="skills wow fadeInDownBig" data-wow-delay=".9s">
            <div class="img-wrapper">
              <img src="../img/techs/nodejs.png">
            </div>
            <p>Nodejs</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay="1s">
            <div class="img-wrapper">
              <img src="../img/techs/php.png">
            </div>
            <p>Php</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay="1.1s">
            <div class="img-wrapper">
              <img src="../img/techs/laravel.png">
            </div>
            <p>Laravel</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay="1.2s">
            <div class="img-wrapper">
              <img src="../img/techs/codeigniter.png">
            </div>
            <p>Codeigniter</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay="1.3s">
            <div class="img-wrapper">
              <img src="../img/techs/mysql.png">
            </div>
            <p>Mysql</p>
          </div>
          <div class="skills wow fadeInDownBig" data-wow-delay="1.4s">
            <div class="img-wrapper">
              <img src="../img/techs/mongodb.png">
            </div>
            <p>MongoDB</p>
          </div>
          
        </div>

      </div>

      <div class="section-item projects-container">
        <div id="web-proj">
          <div class="section-title wow fadeInRight web-project">
            <p>Web</p>
          </div>

          <div class="projects-box">
            <div class="project-column">
              <div class="project wow fadeInUp">
                <a href="http://medicloud.sg" target="_blank">
                  <img src="../img/project full page/mednefits.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="http://ganp.holisticpracticemanagement.com/" target="_blank">
                  <img src="../img/project full page/holistic.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="http://mockupdevs.esy.es/~hpm/truecarefamilymedicine.com/" target="_blank">
                  <img src="../img/project full page/tcf.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="https://solaps.asia/index" target="_blank">
                  <img src="../img/project full page/solaps.png">
                </a>
              </div>
            </div>

            <div class="project-column">
              <div class="project wow fadeInUp">
                <a href="https://www.groupstar.io/">
                  <img src="../img/project full page/groupstar.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="http://bigfitnessgym.com/">
                  <img src="../img/project full page/bigfit.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="http://mockupdevs.esy.es/~dws/creative360travel.com/">
                  <img src="../img/project full page/creative360.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="http://mockupdevs.esy.es/~hpm/naturopathicvirtualassistant.com/">
                  <img src="../img/project full page/naturopathic.png">
                </a>
              </div>
              <div class="project wow fadeInUp">
                <a href="https://www.nearest.com/" target="_blank">
                  <img src="../img/project full page/nearest.png">
                </a>
              </div>
              
            </div>
          </div> 
        </div>

        <div class="white-space-50"></div>

        <div id="mobile-proj">
          <div class="section-title wow fadeInRight mobile-project">
            <p>Mobile</p>
          </div>

          <div class="projects-box">
            <div class="project-column">
              <div class="project wow fadeInUp">
                <a href="https://www.nearest.com/" target="_blank">
                  <img src="../img/project full page/nearest-mobile.png">
                </a>
              </div>
            </div>
            <div class="project-column">
            </div>
            <div class="project-column">
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer id="footer-container">

      <div class="footer-contact">

        <div class="contact-column">

          <div class="form-box" >
            <textarea id="message-box" rows="8" class="form-element" name="" style="resize:none;" placeholder="Send a message..."  disabled></textarea> 
          </div>

          <div class="form-box text-center">
            <button class="btn btn-send" style="cursor: not-allowed;" disabled>Send Now</button>
          </div>

        </div>
        <div class="contact-column"> 

          <div class="contact-desc">
            <i class="fa fa-google-plus"></i>
            <p>jeamar1234@gmail.com</p>
          </div>
           <div class="contact-desc">
            <i class="fa fa-skype"></i>
            <p>jempols101</p>
          </div>
           <div class="contact-desc">
            <i class="fa fa-map-marker"></i>
            <p>Pacana-burgos Street,</p>
          </div>
           <div class="contact-desc">
            <i class="fa"></i>
            <p>Cagayan de Oro City,</p>
          </div>
           <div class="contact-desc">
            <i class="fa"></i>
            <p>Philippines 9000</p>
          </div>
           <div class="contact-desc">
            <i class="fa fa-phone"></i>
            <p>+639955332302</p>
          </div>

        </div>
        
      </div>

      <div class="footer-copyright">
        <p class="">&copy; 2017 Jeamar Libres. All rights reserved.</p>
      </div>

    </footer>
    
    
  </body>

  <script type="text/javascript" src="<?php echo $server; ?>/js/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/wow.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/portfolio/js/index.js"></script>

  <!-- 
    $(function() {
      

      $("#submit").click(function(e) {
        var fields = {
          name  : $("#name"),
          email : $("#email"),
          subject : $("#subject"),
          message : $("#message")
        };

        if(fields.name.val()=="") { fields.name.addClass("error"); error = true; }
        if(fields.email.val()=="") {
          fields.email.addClass("error");
          error = true;
        } else {
          var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if(!reg.test(fields.email.val())) {
            fields.email.addClass("error");
            error = true;
          }
        }
        if(fields.subject.val()=="") { fields.subject.addClass("error"); error = true; }
        if(fields.message.val()=="") { fields.message.addClass("error"); error = true; }

        if(!error) {
          $.ajax({
            type: $("form").attr("method"),
            url: $("form").attr("action"),
            data: "name=" + $("#name").val() + "&email=" + $("#email").val() + "&subject=" + $("#subject").val() + "&budget=" + $("#budget").val() + "&message=" + $("#message").val().replace('&','%26'),
            beforeSend: function() {
              $("#status button").hide();
            },
            success: function(html) {
              $("#status #success").html(html).show();
            },
            error: function(html) {
              $("#status button").show();
              $("#status #error").html(html).show();
            }
          });
        }
        e.preventDefault()
      });
    });
   -->
  
</html>