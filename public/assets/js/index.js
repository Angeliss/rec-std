$(function () {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.querySelector('#menu-btn');
    const closeBtn = document.querySelector('#close-btn');
    const themeToggler = document.querySelector('.theme-toggler');

    // Show sidebar
    if (menuBtn != null) {
        menuBtn.addEventListener('click', () => {
            sideMenu.style.display = 'block';
        })
    }
    // Close sidebar
    if (closeBtn != null) {
        closeBtn.addEventListener('click', () => {
            sideMenu.style.display = 'none';
        })
    }
    // Change theme
    if (themeToggler != null) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme-variables');

            themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
            themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
        })
    }

    const triggerTabList = document.querySelectorAll('#nav-tab a')
    triggerTabList.forEach(triggerEl => {
        const tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', event => {
            event.preventDefault()
            tabTrigger.show()
        })
    })

    // const tabEl = document.querySelector('a[data-bs-toggle="tab"]')
    // tabEl.addEventListener('shown.bs.tab', event => {
    //     event.target // newly activated tab
    //     event.relatedTarget // previous active tab
    // })

})