import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        res.render("pages/index", { title: "Todo App", todos: todos, id: req.params.id });
    });
    // res.render("index", { title: "Todo App", todos: [] });
});

router.get("/new", (req, res) => {
    res.render("pages/new", { title: "New Todo" });
});

// route for add a todo
router.post("/", (req, res) => {
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err;

        let todos = JSON.parse(data);

        let todo = {
            id: todos.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        }

        todos.push(todo);
        fs.writeFile('./public/data/todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.redirect("/");
        });

    });
})

// route for delete a todo
router.post("/:id", (req, res) => {
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err;

        let todos = JSON.parse(data);
        let todo = todos.find(todo => todo.id == req.params.id);
        let index = todos.indexOf(todo);
        todos.splice(index, 1);

        fs.writeFile("./public/data/todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;

            res.redirect("/");
        })
    });

});

//Read and show the json file on the route /edit
router.get("/edit", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        console.log(todos)

        // redirect
        res.render('./pages/edit', { title: `Edit`, todos: todos, id: req.params.id })
    })
})

//Read and show the json file on the route /edit/id ex: /edit/6
router.get("/edit/:id", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        // redirect
        res.render('./pages/edit', { title: `${todos.title}`, todos: todos, id: req.params.id })
    })
})

//post data on JSON file
router.post("/edit/:id", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        let newToDo = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description
        }

        //Find the element
        let todo = todos.find(todo => todo.id == req.params.id);
    
        // find index
        let index = todos.indexOf(todo);
    
        todos.splice(index, 1, newToDo);
    
        console.log(todos)

        // redirect
        res.render('./pages/edit', { title: `${todos.title}`, todos: todos, id: req.params.id })
    })
})

export default router;