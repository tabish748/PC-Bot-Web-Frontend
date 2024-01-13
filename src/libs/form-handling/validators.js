export const Validators = {
    isEmail: (input) => {
      if(input.value)
      {
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!input.value.match(emailPattern)) {
        return 'Invalid email address';
      }
      }
      return null;
    },
    minLength: (input, params) => {
        const length = parseInt(params, 10);
        if (input.value.trim().length < length) {
          return `Input must be at least ${length} characters long`;
        }
        return null;
      },
    maxLength: (length) => (input) => {
      if (input.value.trim().length > length) {
        return `Input must not exceed ${length} characters`;
      }
      return null;
    },
    required: (input) => {
      if (!input.value.trim()) {
        return 'This field is required';
      }
      return null;
    },
    isNumber: (input) => {
      if (isNaN(input.value)) {
        return 'Input must be a number';
      }
      return null;
    },
    strongPassword: (input) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/;
        if (!input.value.match(passwordPattern)) {
        return 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character';
      }
      return null;
    },
    maxDate: (input, minAge) => {
      const inputDate = new Date(input.value);
      const currentDate = new Date();
      const minAgeDate = new Date(
        currentDate.getFullYear() - minAge,
        currentDate.getMonth(),
        currentDate.getDate()
      );
  
      if (inputDate > minAgeDate) {
        return `Date must be at least ${minAge} years ago`;
      }
      return null;
    },
  };
  