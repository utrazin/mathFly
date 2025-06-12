// fase-protection.js
(function () {
    const progress = JSON.parse(localStorage.getItem('quizProgress')) || {
        easy: true,
        medium: false,
        hard: false,
        expert: false
    };

    const path = window.location.pathname;

    // Protege páginas de nível
    if (path.includes('nivel_2.html') && !progress.medium) {
        alert("Você ainda não desbloqueou a fase MÉDIA.");
        window.location.href = "fases.html";
    }

    if (path.includes('nivel_3.html') && !progress.hard) {
        alert("Você ainda não desbloqueou a fase DIFÍCIL.");
        window.location.href = "fases.html";
    }

    if (path.includes('nivel_4.html') && !progress.expert) {
        alert("Você ainda não desbloqueou a fase EXPERT.");
        window.location.href = "fases.html";
    }
})();
