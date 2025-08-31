document.addEventListener('DOMContentLoaded', function() {
    const candidateForm = document.getElementById('candidateForm');
    
    if (candidateForm) {
        candidateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(candidateForm);
            const candidateInfo = {
                name: formData.get('name'),
                email: formData.get('email'),
                street: formData.get('street'),
                state: formData.get('state'),
                country: formData.get('country'),
                phone: formData.get('phone'),
                skill: formData.get('skill')
            };
            
            // Store candidate info in localStorage
            localStorage.setItem('candidateInfo', JSON.stringify(candidateInfo));
            
            // Redirect to appropriate exam page
            const skill = candidateInfo.skill;
            if (skill) {
                window.location.href = `exam-${skill}.html`;
            }
        });
    }
});
