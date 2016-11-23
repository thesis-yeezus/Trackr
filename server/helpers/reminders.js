var moment = require('moment');
var CronJob = require('cron').CronJob;  
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var fs = require('fs');
var path = require('path');
var User = require('../db').User;
var JobOpening = require('../db').JobOpening;
var yesterday = moment().subtract(1, 'days');
var threeDaysAgo = moment().subtract(3, 'days');
var weekAgo = moment().subtract(7, 'days');
var jobCounter = {};
var oneDayGoals = {};
var threeDayJobCounter = {};
var threeDayGoals = {};
var weeklyJobCounter = {};
var weeklyGoals = {};
var interviewReminder = path.join(__dirname, 'interviewReminder.html')
var phoneScreenReminder = path.join(__dirname, 'phoneScreenReminder.html')

var job = new CronJob({
  cronTime: '00 48 18 * * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true,
        frequency: 1
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          oneDayGoals[user.dataValues.id.toString()] = user.dataValues.goals
          jobCounter[user.dataValues.id.toString()] = 0
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var jobCreation = moment(job.dataValues.createdAt)
                if(jobCreation.diff(yesterday) > 0) {
                  var userId = job.dataValues.userId.toString()
                  jobCounter[userId]++
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();

var interviewCheck = new CronJob({
  cronTime: '00 19 16 * * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var interviewDate = moment(job.dataValues.interview)
                console.log("This is interviewdate diff moment, ", interviewDate.diff(moment()))
                if(interviewDate.diff(moment()) <= 86400000 && interviewDate.diff(moment())) {
                  fs.readFile(interviewReminder, {encoding: 'utf-8'}, function(err, data) {
                    if ( ! err ) {
                      var from_email = new helper.Email('trackr.dev@gmail.com');
                      var to_email = new helper.Email(user.dataValues.email);
                      var subject = 'Interview Reminder from Trackr';
                      var content = new helper.Content('text/html', data);
                      var mail = new helper.Mail(from_email, subject, to_email, content);
                      var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON(),
                      });

                      sg.API(request, function(error, response) {
                        console.log(response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                      });
                  } else {
                    console.log(err);
                  }
                  })
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
interviewCheck.start();

var phoneScreenCheck = new CronJob({
  cronTime: '00 19 16 * * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var phoneScreenDate = moment(job.dataValues.phoneScreen)
               if(phoneScreenDate.diff(moment()) <= 86400000 && phoneScreenDate.diff(moment()) > 0) {
                  fs.readFile(phoneScreenReminder, {encoding: 'utf-8'}, function(err, data) {
                    if ( ! err ) {
                      var from_email = new helper.Email('trackr.dev@gmail.com');
                      var to_email = new helper.Email(user.dataValues.email);
                      var subject = 'Phone Screen Reminder from Trackr';
                      var content = new helper.Content('text/html', data);
                      var mail = new helper.Mail(from_email, subject, to_email, content);
                      var request = sg.emptyRequest({
                        method: 'POST',
                        path: '/v3/mail/send',
                        body: mail.toJSON(),
                      });

                      sg.API(request, function(error, response) {
                        console.log(response.statusCode);
                        console.log(response.body);
                        console.log(response.headers);
                      });
                  } else {
                    console.log(err);
                  }
                  })
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
phoneScreenCheck.start();

var threeDayJob = new CronJob({
  cronTime: '00 00 15 */3 * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true,
        frequency: 3
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          threeDayGoals[user.dataValues.userId] = user.dataValues.goals
          threeDayJobCounter[user.dataValues.userId] = 0
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var jobCreation = moment(job.dataValues.createdAt)
                if(jobCreation.diff(threeDaysAgo) > 0) {
                  var userId = job.dataValues.userId.toString()
                  threeDayJobCounter[userId]++
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
threeDayJob.start();

var weeklyJob = new CronJob({
  cronTime: '00 00 15 */7 * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true,
        frequency: 7
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          weeklyGoals[user.dataValues.userId] = user.dataValues.goals
          weeklyJobCounter[user.dataValues.userId] = 0
          JobOpening.findAll({
            where: {
              userId: user.dataValues.id
            }
          })
            .then(function(jobs) {
              jobs.forEach(function(job) {
                var jobCreation = moment(job.dataValues.createdAt)
                if(jobCreation.diff(weekAgo) > 0) {
                  var userId = job.dataValues.userId.toString()
                  weeklyJobCounter[userId]++
                }
              })
            })
        })
      })
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
weeklyJob.start();

var dailyEmailer = new CronJob({
  cronTime: '15 48 18 * * 1-7',
  onTick: function() {
    for(var key in jobCounter) {
      console.log("this is key ", key)
      if(jobCounter[key] <= oneDayGoals[key]) {
        User.findOne({
          where: {
            id: key,
            receiveEmails: true,
            frequency: 1
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            console.log("This is user goals ", user.dataValues.goals)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Good Afternoon, \r\n This is a quick reminder that you have not reached your goal of ' + user.dataValues.goals + ' job applications. \r\n If you wish to stop receiving emails please visit Trackr.com and cancel notifications!');
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
          })
      } 
    }
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
dailyEmailer.start();

var threeDayEmailer = new CronJob({
  cronTime: '20 00 15 */3 * 1-7',
  onTick: function() {
    for(var key in threeDayJobCounter) {
      if(threeDayJobCounter[key] <= threeDayGoals[key]) {
        User.findOne({
          where: {
            id: key,
            receiveEmails: true,
            frequency: 3
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Good Afternoon, \r\nThis is a quick reminder that you have not reached your goal of ' + threeDayGoals[key] + ' job applications. \r\n If you wish to stop receiving emails please visit Trackr.com and cancel notifications!');
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
          })
      } 
    }
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
threeDayEmailer.start();

var weeklyEmailer = new CronJob({
  cronTime: '25 00 15 */7 * 1-7',
  onTick: function() {
    for(var key in weeklyJobCounter) {
      if(weeklyJobCounter[key] <= weeklyGoals[key]) {
        User.findOne({
          where: {
            id: key,
            receiveEmails: true,
            frequency: 7
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Good Afternoon, \r\nThis is a quick reminder that you have not reached your goal of ' + weeklyGoals[key] + ' job applications. \r\n If you wish to stop receiving emails please visit Trackr.com and cancel notifications!');
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });

            sg.API(request, function(error, response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
          })
      } 
    }
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
weeklyEmailer.start();
