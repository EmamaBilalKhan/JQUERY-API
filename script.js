const apiUrl = "https://dummyjson.com/todos";

function fetchData() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    success: function (data) {
      const todos = data.todos;
      const $tableBody = $("#todoTable tbody");
      $tableBody.empty();
      todos.forEach((todo) => addRowToTable(todo));
      displayAddButton();
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}

function addRowToTable(todo) {
  const row = `
    <tr data-id="${todo.id}">
      <td>${todo.id}</td>
      <td>${todo.todo}</td>
      <td>${todo.completed}</td>
      <td>${todo.userId}</td>
      <td>
        <button onclick="updateTodo(${todo.id})">Update</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </td>
    </tr>
  `;
  $("#todoTable tbody").append(row); 
}

function addTodo() {
  const newTodo = {
    todo: prompt("Enter a new todo:"),
    completed: false,
    userId: Math.floor(Math.random() * 200),
  };
  $.ajax({
    url: `${apiUrl}/add`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newTodo),
    success: function (data) {
      addRowToTable(data); 
      alert("Todo added successfully!");
    },
    error: function (error) {
      console.error("Error adding todo:", error);
    },
  });
}

function updateTodo(id) {
  const updatedTodo = {
    todo: prompt("Update the todo text:"),
    completed: confirm("Mark as completed?"),
  };
  $.ajax({
    url: `${apiUrl}/${id}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(updatedTodo),
    success: function (data) {
      const $row = $(`tr[data-id='${id}']`);
      $row.find("td:nth-child(2)").text(data.todo); 
      $row.find("td:nth-child(3)").text(data.completed); 
      alert("Todo updated successfully!");
    },
    error: function (error) {
      console.error("Error updating todo:", error);
    },
  });
}

function deleteTodo(id) {
  $.ajax({
    url: `${apiUrl}/${id}`,
    method: "DELETE",
    success: function () {
      $(`tr[data-id='${id}']`).remove(); 
      alert("Todo deleted successfully!");
    },
    error: function (error) {
      console.error("Error deleting todo:", error);
    },
  });
}

function displayAddButton() {
  $(".add-button").show();
}
