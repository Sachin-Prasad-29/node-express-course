const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

//get all the task
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({}); //.find method will be used to find all  the data from the database
    res.status(201).json({ tasks });
    // res.status(201).json({ tasks,amount:tasks.length });
    //res.status(201).json({ success: true, data: { tasks, amount: tasks.length } });
});

// Create a task
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body); // .create method will be used to add the data into the database
    res.status(201).json({ task });
});

// Get a single Task
const getTask = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.findById({ _id: id });
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({ task });
});

// Update a Single Task
const updateTask = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    // By default we will get the old value in the task
    const task = await Task.findOneAndUpdate({ _id: id }, data, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({ task });
});

//Delete a single Task
const deleteTask = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
        return next(createCustomError(`No task with id: ${id}`, 404));
    }
    res.status(200).json({ task });
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
