const data = []; // Replace with database integration if needed

function addData(newItem) {
    data.push(newItem);
    return newItem;
}

function getAllData() {
    return data;
}

function updateData(id, updatedItem) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedItem;
        return updatedItem;
    }
    return null;
}

function deleteData(id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = { addData, getAllData, updateData, deleteData };
