(function () {
    "use strict";
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var ui = WinJS.UI;
    var htmlinited = false;
    var editor;
    var asynCancel = null;
    var m_atts = new Array();
    ui.Pages.define("/default.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            init_gui();
        },

        unload: function () {

        }

    });

    function init_gui() {

        // add OnClick event handler
        var btn = document.getElementById("btnSend");
        btn.addEventListener("click", send_email, false);
    }

    function send_email() {
        var result = "";

        var oMail = new EASendMail.SmtpMail("TryIt");

        // Set sender email address, please change it to yours
        oMail.from = new EASendMail.MailAddress("test@emailarchitect.net");

        // Add recipient email address, please change it to yours
        oMail.to.add(new EASendMail.MailAddress("support@emailarchitect.net"));

        // Set email subject
        oMail.subject = "test email from JavaScript HTML5 project";

        // Set email body
        oMail.textBody = "this is a test email sent from Windows Store App, do not reply";

        // Your SMTP server address
        var oServer = new EASendMail.SmtpServer("smtp.emailarchitect.net");

        // User and password for ESMTP authentication
        oServer.user = "test@emailarchitect.net";
        oServer.password = "testpassword";

        // If your SMTP server requires TLS connection on 25 port, please add this line
        // oServer.connectType = EASendMail.SmtpConnectType.connectSSLAuto;

        // If your SMTP server requires SSL connection on 465 port, please add this line
        // oServer.port = 465;
        // oServer.connectType = EASendMail.SmtpConnectType.connectSSLAuto;

        var oSmtp = new EASendMail.SmtpClient();

        var btn = document.getElementById("btnSend");
        btn.disabled = true;
        oSmtp.sendMailAsync(oServer, oMail).then(function (e) {
            result = "Email was sent successfully!";

            // Display Result by Diaglog box
            (new Windows.UI.Popups.MessageDialog(result, "Success")).showAsync();
            btn.disabled = false;
        },

        function (e) {
            // because javascript exception only gives the stack trace messages, but it is not
            // real description of exception, so we give a property lastErrorMessage for javascript.
            if (oSmtp.lastErrorMessage != "") {
                result = oSmtp.lastErrorMessage;
            }
            else {
                result = e.message;
            }
            oSmtp.close();

            // Display Result by Diaglog box
            (new Windows.UI.Popups.MessageDialog(result, "Error Information")).showAsync();
            btn.disabled = false;
        });
    }
})();