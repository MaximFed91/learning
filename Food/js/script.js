window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabcontent'),
        tabsList = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabs.forEach((item) => {
            item.style.display = 'none';
        });
        tabsList.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        tabs[i].style.display = 'block';
        tabsList[i].classList.add('tabheader__item_active')
    }
    tabsList[0].parentElement.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.matches('.tabheader__item')) {
            tabsList.forEach((item, i) => {
                if (item == target) {
                    hideTabs();
                    showTab(i);
                }
            });
        }

    });
    hideTabs();
    showTab();
});