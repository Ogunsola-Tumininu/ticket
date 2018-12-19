const express = require('express');
const config = require('../config/database');
const Ticket = require('../models/ticket');

const router = express.Router(); 

// post ticket to database
router.post('/ticket', function(req, res){
    console.log('Posting a ticket to db');
    var newTicket = new Ticket;

    newTicket.name = req.body.name;
    newTicket.price = req.body.price;
    newTicket.type = req.body.type;
    newTicket.save(function(err, insertedTicket){
        if(err){
            res.json({success:false, msg: err});
        }
        else{
            res.json({success:true, ticket: insertedTicket});
        }
    })
});


// Get all the ticket in the database
router.get('/ticket/all', function(req, res){
    console.log('Get request for all tickets');
    Ticket.find({})
    .exec(function(err, tickets){
        if(err){
            res.json({success:false, msg: err});
        }
        else{
            res.json({success:true, ticket: tickets});
        }
    })
});

// Get a ticket
router.get('/ticket/:id', function(req, res){
    var id = req.params.id;
    console.log('Get request for single ticket');
    Ticket.findById(id)
    .exec(function(err, ticket){
        if(err){
            res.json({success:true, msg: err});
        }
        else{
            res.json({success:true, ticket: ticket});
        }
    })
});


// Edit a ticket
router.put('/ticket/:id', function (req, res){
    var id = req.params.id;
    console.log('Update a ticket');
    Ticket.findByIdAndUpdate(id,
    {
        $set: {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        }
    },
    {
        new: true
    },
    function(err, updatedTicket){
        if(err){
            res.json({success:true, msg: err});
        }
        else{
            res.json({success:true, ticket: updatedTicket});
        }
    }
    );
});

// Update ticket type
router.put('/ticket/updateType/:id', function (req, res){
    var id = req.params.id;
    console.log('Update ticket type');
    Ticket.findByIdAndUpdate(id,
    {
        $set: {
            type: req.body.type
        }
    },
    {
        new: true
    },
    function(err, updatedTicketType){
        if(err){
            res.json({success:true, msg: err});
        }
        else{
            res.json({success:true, ticket: updatedTicketType});
        }
    }
    );
});


router.delete('/ticket/:id', function(req, res){
    console.log('Deleting a ticket');
    Ticket.findByIdAndRemove(req.params.id, function(err, deletedTicket){
        if(err){
            res
            .status(404)
            .send("Error deleting video", err);
        }
        else{
            res
            .status(204)
            res.json({success:true, msg: "Ticket has been deleted successfully",ticket: deletedTicket});
        }
    });
});



module.exports = router;