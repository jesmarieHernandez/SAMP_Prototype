import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import renderedPageRouter from './renderedPageRouter.jsx';
import {ObjectId} from 'bson';


const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
console.log('express');
let db;

app.use(session({secret: 'h7e3f5s6', resave: false, saveUninitialized: true}));

app.all('/api/*', (req, res, next) => {
    if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
        if (!req.session || !req.session.user) {
            console.log('/api/*');
            //res.status(403).send({
            //    message: 'You are not authorized to perform the operation'
            //});
            next();
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

app.get('/api/users/me', (req, res) => {
    console.log('/api/users/me');
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({signedIn: false, name: ''});
    }
});

app.post('/api/activities', (req, res) => {
    console.log('/api/activities');
    console.log('request body:' + req.body);
    const newActivity = req.body;

    console.log('db: ' + db);
    console.log(req.body.creationDate);
    console.log(typeof(req.body.requestDate));
    db.collection('activities').insertOne(newActivity)
        .then(result => {
            console.log(result);
            db.collection('activities').find({_id: result.insertedId}).limit(1)
                .next().then(activity => {
                console.log(activity);
                res.status(200).json(activity);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/activities/:id/approve', (req, res) => {
    console.log('/api/activities/:id/approve');
    console.log('request body:' + req.body);

    let activityId;
    try {
        activityId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid activity ID format: ${error}`});
        return
    }

    db.collection('activities').updateOne({ _id: activityId }, {$set: {status: 'approved'}}).then(() =>
    db.collection('activities').find({ _id: activityId}).limit(1)
        .next()
    ).then(updatedActivity => {
        console.log("Approved succesfully");
        res.json(updatedActivity);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/activities/:id/deny', (req, res) => {
    console.log('/api/activities/:id/deny');
    console.log('request body:' + req.body);

    let activityId;
    try {
        activityId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid activity ID format: ${error}`});
        return
    }

    db.collection('activities').updateOne({ _id: activityId }, {$set: {status: 'denied' }}).then(() =>
        db.collection('activities').find({ _id: activityId}).limit(1)
            .next()
    ).then(updatedActivity => {
        console.log("Denied succesfully");
        res.json(updatedActivity);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}`});
    });
});

app.get('/api/pending', (req, res) => {
    console.log('/api/pending');

    db.collection('activities').find({status: 'pending'}).count().then((count) => {
        console.log('Total pending activities: ' + count);
        if (!count) res.status(404).json({message: 'No pending activities'});
        else {
            res.json(count);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.get('/api/celebrated', (req, res) => {
    console.log('/api/pending');

    db.collection('activities').find({status: 'celebrated'}).count().then((count) => {
        console.log('Total pending activities: ' + count);
        if (!count) res.status(404).json({message: 'No celebrated activities'});
        else {
            res.json(count);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.get('/api/cancelled', (req, res) => {
    console.log('/api/cancelled');

    db.collection('activities').find({status: 'cancelled'}).count().then((count) => {
        console.log('Total pending activities: ' + count);
        if (!count) res.status(404).json({message: 'No cancelled activities'});
        else {
            res.json(count);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});


app.post('/api/users', (req, res) => {
    console.log('/api/users');
    console.log('request body:' + req.body);
    const newUser = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('users').insertOne(newUser)
        .then(result => {
            console.log(result);
            db.collection('users').find({_id: result.insertedId}).limit(1)
                .next().then(user => {
                console.log(user);
                res.status(200).json(user);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).jsoapp.get('/api/facilities/', (req, res) => {
            db.collection('facilities').find().toArray()
                .then(results => {
                    res.json(results);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({message: `Internal Server Error: ${error}`});
                });
        });
        n({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/facilities', (req, res) => {
    console.log('/api/facilities');
    console.log('request body:' + req.body);
    const newFacilities = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('facilities').insertOne(newFacilities)
        .then(result => {
            console.log(result);
            db.collection('facilities').find({_id: result.insertedId}).limit(1)
                .next().then(facilities => {
                console.log(facilities);
                res.status(200).json(facilities);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});

app.post('/api/organizations', (req, res) => {
    console.log('/api/organizations');
    console.log('request body:' + req.body);
    const newOrganization = req.body;
    //newActivity.requestDate = new Date();

    console.log('db: ' + db);
    db.collection('organizations').insertOne(newOrganization)
        .then(result => {
            console.log(result);
            db.collection('organizations').find({_id: result.insertedId}).limit(1)
                .next().then(organization => {
                console.log(organization);
                res.status(200).json(organization);
            })
        }).catch(error => {
        console.log('ERROR: ' + error);
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
});


app.get('/api/activities/', (req, res) => {
    db.collection('activities').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/organizations/', (req, res) => {
    db.collection('organizations').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/facilities/', (req, res) => {
    db.collection('facilities').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/users/', (req, res) => {
    db.collection('users').find().toArray()
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/activities/:id', (req, res) => {
    let requestID;
    try {
        requestID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid request ID format: ${error}`});
        return;
    }

    db.collection('activities').find({_id: requestID}).limit(1)
        .next()
        .then(result => {
            console.log(result);
            if (!result) res.status(404).json({message: `No such request: ${requestID}`});
            else {
                res.json(result)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/facilities/:id', (req, res) => {
    let facilitiesID;
    try {
        facilitiesID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid facilities ID format: ${error}`});
        return;
    }

    db.collection('facilities').find({_id: facilitiesID}).limit(1)
        .next()
        .then(result => {
            console.log(result);
            if (!result) res.status(404).json({message: `No such request: ${facilitiesID}`});
            else {
                res.json(result)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/organizations/:id', (req, res) => {
    let organizationID;
    try {
        organizationID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid organization ID format: ${error}`});
        return;
    }

    db.collection('organizations').find({_id: organizationID}).limit(1)
        .next()
        .then(result => {
            console.log(result);
            if (!result) res.status(404).json({message: `No such organization: ${organizationID}`});
            else {
                res.json(result)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/organizations/:id/activities', (req, res) => {
    let organizationID;
    try {
        organizationID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid organization ID format: ${error}`});
        return;
    }
    console.log(organizationID);

    db.collection('activities').find().toArray().then(results => {
        console.log('Numero de resultados pre: ' + results.length);
        const activities = results.filter(function (activity) {
            return activity.organization._id == organizationID;
        });
        console.log('Numero de resultados post: ' + activities.length);
        res.json(activities);
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});

app.get('/api/users/:id', (req, res) => {
    let userID;
    try {
        userID = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({message: `Invalid user ID format: ${error}`});
        return;
    }

    db.collection('users').find({_id: userID}).limit(1)
        .next()
        .then(result => {
            console.log(result);
            if (!result) res.status(404).json({message: `No such user: ${userID}`});
            else {
                res.json(result)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: `Internal Server Error: ${error}`});
        });
});


app.use('/', renderedPageRouter);

function setDb(newDb) {
    console.log('DB has been set');
    db = newDb;
}

export {app, setDb};

