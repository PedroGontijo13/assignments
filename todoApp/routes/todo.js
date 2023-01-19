import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        res.render("pages/index", { title: "Todo App", todos: todos });
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

router.get("/edit/:id", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        //Find the element
        let todo = todos.find(todo => todo.id == req.params.id);

        // find index
        let index = todos.indexOf(todo);

        console.log(todo)

        // redirect
        res.render('./pages/edit', { title: `${todos[index].title}`, todos: todos[index] })
    })
})

router.post("/edit/:id", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        //Find the element
        let todo = todos.find(todo => todo.id == req.params.id);

        // find index
        let index = todos.indexOf(todo);

        todos.splice(index, 1, todo);

        console.log(todos)

        fs.writeFile("./public/data/todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;

            res.redirect("/edit");
        })
    })
})

router.get("/edit", (req, res) => {
    // read file
    fs.readFile("./public/data/todos.json", (err, data) => {
        if (err) throw err

        let todos = JSON.parse(data)

        console.log(todos)

        // redirect
        res.render('./pages/editForm', { title: `editForm`, todos: todos })
    })
})

export default router;