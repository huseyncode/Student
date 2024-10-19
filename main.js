import { API_BASE_URL } from "./constants.js";
import { getAllData, deleteDataById } from "./helpers.js";

const userList = document.getElementById('user-list');

// Fetch all users and display
async function fetchUsers() {
    const users = await getAllData(API_BASE_URL, '/users');
    userList.innerHTML = ''; // Clear current list
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('col-md-4', 'mb-4');
        userCard.innerHTML = `
            <div class="card">
                <img src="${user.image}" class="card-img-top" alt="${user.name}">
                <div class="card-body">
                    <h5 class="card-title">${user.name} ${user.surname}</h5>
                    <p class="card-text"><strong>Rank:</strong> ${user.rank}</p>
                    <p class="card-text"><strong>Birthday:</strong> ${user.birthday}</p>
                    <p class="card-text">${user.description}</p>
                    <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </div>
        `;
        userList.appendChild(userCard);
    });
}

// Add or Edit User
document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const birthday = document.getElementById('birthday').value;
    const rank = document.getElementById('rank').value;
    const description = document.getElementById('description').value;
    const userId = document.getElementById('userId').value;

    const userData = {
        name, surname, birthday, rank, description, image: 'placeholder.jpg' // Image is static for now
    };

    try {
        if (userId) {
            // Update user
            await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
        } else {
            // Add new user
            await axios.post(`${API_BASE_URL}/users`, userData);
        }
        document.getElementById('userForm').reset();
        fetchUsers();
        const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
        modal.hide();
    } catch (error) {
        console.error("Error saving user:", error);
    }
});

// Edit User
async function editUser(id) {
    const user = await axios.get(`${API_BASE_URL}/users/${id}`);
    document.getElementById('name').value = user.data.name;
    document.getElementById('surname').value = user.data.surname;
    document.getElementById('birthday').value = user.data.birthday;
    document.getElementById('rank').value = user.data.rank;
    document.getElementById('description').value = user.data.description;
    document.getElementById('userId').value = user.data.id;
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
}

// Delete User
async function deleteUser(id) {
    await deleteDataById(API_BASE_URL, '/users', id);
    fetchUsers();
}
function filterUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) || user.surname.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}


// Initialize user list on page load
fetchUsers();
