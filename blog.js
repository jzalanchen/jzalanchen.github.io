/**
 * @typedef {{
 *  title: string,
 *  date: string,
 *  summary: string,
 * }} Blog
 */


 export function dateFormat() {
    const date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes()
    let ampm = hours >= 12 ? 'pm' : 'am'
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getUTCFullYear();
    hours = hours % 12;
    if(hours == 0 && ampm === 'pm'){
        hours = 12;
    }

    month++;
    month = month >= 10 ? month : (`0${month}`);
    min = min.toString().padStart(2, '0');
    let strTime = month + '/' + day + '/' + year + ', ' + hours + ':' + min + ' ' + ampm; 
    return strTime;
}

//load JSON mao from local storage
function loadBlogs() {
    return JSON.parse(localStorage.getItem('blogs')) || {};
}

//store JSON map into local storage
function storeBlogs(blogs){
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

//generate a ID from each blog.
function generateBlogId() {
    return crypto.randomUUID();
}

/**
 * insert blog to the screen and 
 * to the local storage
 * 
 * @param {object} blog new blog
 * @returns the id
 */
export function insertBlog(blog) {
    //need to load whatever is stored in the local storage
    const blogs = loadBlogs();
    //generate a ID for new blog
    const blogId = generateBlogId();
    //insert new blog to the JSON map
    blogs[blogId] = blog;
    //update the local storage
    storeBlogs(blogs);
    return blogId;
}

/**
 * get all blogs
 * @returns map
 */
export function selectAllBlogs() {
    const blogs = loadBlogs()
    return blogs;
}

/**
 * delete a single blog by its id
 * @param {string} blogId that need to be deleted
 * @returns true delete successful
 */
export function deleteBlog(blogId){
    //load JSON map
    const blogs = loadBlogs();
    //target not in the map
    if(!(blogId in blogs)) return false;
    //delete from the map
    delete blogs[blogId];
    //update the local storage
    storeBlogs(blogs);
    return true;
}

/**
 * update the existing blog
 * @param {string} blogId the item that we need to update 
 * @param {Object} blog new content
 */
export function updateBlog(blogId, blog){
    const blogs = loadBlogs();
    blogs[blogId] = blog; 
    storeBlogs(blogs);
}

function countBlogs() {
    const blogs = loadBlogs();
    return Object.keys(blogs).length;
}

/**
 * render a single blog
 * @param {string} blogId representation the single object
 * @param {Blog} blog 
 * @param {*} container display container
 * @returns 
 */
export function renderBlog(blogId, blog, container){

    if(countBlogs() != 0){
        document.getElementById("hint").style.display = "none";
    }

    //get the template
    const tpl = document.getElementById("blog-template");
    //clone a new one
    const blogEl = tpl.content.cloneNode(true);

    //assigne custom attribute
    blogEl.children[0].dataset.blogId = blogId;

    //assign title
    const titleSpan = blogEl.querySelector('#span-title');
    titleSpan.textContent = blog.title;

    //assign date
    const dateSpan = blogEl.querySelector('#span-date');
    dateSpan.textContent = blog.date;

    //assign summary
    const summarySpan = blogEl.querySelector('#span-summary');
    summarySpan.textContent = blog.summary;

    //handle delete for each blog(current blogEl)
    const deleteBtn = blogEl.querySelector('#delete');
    deleteBtn.addEventListener("click", function (){
        //get the current blog
        const existingBlog = container.querySelector(`[data-blog-id="${blogId}"]`);
        //remove from the screen
        if(existingBlog){
            existingBlog.remove();
        }
        //remove from the local storage
        deleteBlog(blogId);
        if(countBlogs() == 0){
            document.getElementById("hint").style.display = "block";
        }
    });

    //handle edit button
    const editBtn = blogEl.querySelector('#edit');
    editBtn.addEventListener("click", function() {
        //show form and let user enters the new content
        showDiag();
        //handle cancel button
        document.getElementById("cancel").addEventListener("click", function () {
            closeDiag();
        })
        //hand ok button
        document.getElementById("ok").addEventListener("click", function() {  
            //get new content         
            const formData = new FormData(document.getElementById("insert-blog-form"));
            //create a new object
            const newBlog = {};
            for(const[key, value] of formData.entries()){
                newBlog[key] = value;
            }
            //close form
            closeDiag();
            //date doesn't change.
            newBlog["date"] = blog.date.toString();
            //use the new object to replace the old one
            //but do not change the ID
            updateBlog(blogId, newBlog);
            //render all the blogs         
            redisplayAllBlogs(container);   
        });
    });

    return blogEl;
}

/**
 * display a single blog
 * @param {*} blogId 
 * @param {*} blog 
 * @param {*} container 
 */
export function redisplayBlog(blogId, blog, container){
    const blogEl = renderBlog(blogId, blog, container);

    const existingBlog = container.querySelector(`[data-blog-id="${blogId}"]`);
    if(existingBlog){
        existingBlog.remove();
    }
    if(blog){
        container.appendChild(blogEl);
    }
}

/**
 * display all the blogs
 * @param {*} blogsContainer 
 */
export function redisplayAllBlogs(blogsContainer) {
    const books = selectAllBlogs();

    for (const [id, book] of Object.entries(books)) {
        redisplayBlog(id, book, blogsContainer);
    }
}

/**
 * Show cutom dialog
 */
export function showDiag() {
    let t = document.getElementsByTagName("template")[1];
    let clone = t.content.cloneNode(true);
    document.body.appendChild(clone);
    document.getElementById("custom-dialog").showModal();
}

/**
 * remove the dialog
 */
export function closeDiag() {
    let node = document.getElementById("custom-dialog");
    if(node.parentNode){
        node.parentNode.removeChild(node);
    }
}
