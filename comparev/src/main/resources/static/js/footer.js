const displayFooter = function() {
    const footer = document.createElement("footer");
    footer.classList.add("footer-section");
    footer.innerHTML = '<small class="copyright-text">ComparEv &copy;2021</small>'
    return footer;
}

export { displayFooter }

// <!-- <footer class="footer-section">
//     <small class="copyright-text">ComparEv &copy;2021</small>
// </footer> -->