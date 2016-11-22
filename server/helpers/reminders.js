var moment = require('moment');
var CronJob = require('cron').CronJob;  
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var User = require('../db').User;
var JobOpening = require('../db').JobOpening;
var yesterday = moment().subtract(1, 'days');
var threeDaysAgo = moment().subtract(3, 'days');
var weekAgo = moment().subtract(7, 'days');
var jobCounter = {};
var oneDayGoals = null;
var threeDayJobCounter = {};
var threeDayGoals = null;
var weeklyJobCounter = {};
var weeklyGoals = null;

var job = new CronJob({
  cronTime: '00 00 15 * * 1-7',
  onTick: function() {
    User.findAll({
      where: {
        receiveEmails: true,
        frequency: 1
      }
    })
      .then(function(userArr) {
        userArr.forEach(function(user) {
          oneDayGoals = user.dataValues.goals
          jobCounter[user.dataValues.userId] = 0
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
  cronTime: '00 00 12 * * 1-7',
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
                if(interviewDate.diff(moment()) <= 86400000) {
                  var from_email = new helper.Email('trackr.dev@gmail.com');
                  var to_email = new helper.Email(user.dataValues.email);
                  var subject = 'Interview Reminder from Trackr';
                  var content = new helper.Content('text/plain', 'Hello, Email!');
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
  cronTime: '00 00 12 * * 1-7',
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
                var phoneScreenDate = moment(job.dataValues.interview)
                if(phoneScreenDate.diff(moment()) <= 86400000) {
                  var from_email = new helper.Email('trackr.dev@gmail.com');
                  var to_email = new helper.Email(user.dataValues.email);
                  var subject = 'Interview Reminder from Trackr';
                  var content = new helper.Content('text/plain', 'Hello, Email!');
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
          weeklyGoals = user.dataValues.goals
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
  cronTime: '15 00 15 * * 1-7',
  onTick: function() {
    for(var key in jobCounter) {
      if(jobCounter[key] <= oneDayGoals) {
        User.findOne({
          where: {
            receiveEmails: true,
            frequency: 1
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Hello, Email!');
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
      if(threeDayJobCounter[key] <= threeDayGoals) {
        User.findOne({
          where: {
            receiveEmails: true,
            frequency: 3
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Hello, Email!');
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
      if(weeklyJobCounter[key] <= weeklyGoals) {
        User.findOne({
          where: {
            receiveEmails: true,
            frequency: 7
          }
        })
          .then(function(user) {
            console.log("This is User email", user.dataValues.email)
            var from_email = new helper.Email('trackr.dev@gmail.com');
            var to_email = new helper.Email(user.dataValues.email);
            var subject = 'Failure To Meet Goals from Trackr';
            var content = new helper.Content('text/plain', 'Hello, Email!');
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
