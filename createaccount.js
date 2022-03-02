function CreateAccount(){
    const [show, setShow]                 = React.useState(true);
    const [status, setStatus]             = React.useState('');
    const [name, setName]                 = React.useState('');
    const [email, setEmail]               = React.useState('');
    const [password, setPassword]         = React.useState('');
    const [buttonStatus, setButtonStatus] = React.useState(true);
    
    const ctx = React.useContext(UserContext);

    function emailValidate(e){
      if(email === null){
        alert('you cannot leave this field blank');
        setEmail(e.currentTarget.value);
      } else {
        setEmail(e.currentTarget.value);
      }
    }

    function nameValidate(e){
      if(name === null){
        alert('You cannot leave this field blank');
        setName(e.currentTarget.value);
      } else {
        setName(e.currentTarget.value);
      }
    }

    function buttonEnable(e){
      if (password === null){
        setButtonStatus(true);
        setPassword(e.currentTarget.value);
      } else {
        setButtonStatus(false);
        setPassword(e.currentTarget.value);
      }
    }

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            alert('You cannot leave the field blank: ' + label)
            setTimeout(()=> setStatus(''),3000);
            return false;
        } else if(password.length < 8){
          alert('Please create a password that is more than 8 characters long');
          return false;
        }
        return true;
    }

    function handleCreate(){
        console.log(name, email, password);
        if(!validate(name,         'name')) return;
        if(!validate(email,       'email')) return;
        if(!validate(password, 'password')) return;
        ctx.users.push({name,email,password,balance:''});
        setButtonStatus(false);
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
        setButtonStatus(true);
    }

    return (
      <Card
        bgcolor="success"
        header="Create Account" 
        status={status}
        body={show ? (
                <>
                Name<br/>
                <input type="input" className="form-control" id="name"
                placeholder="Enter Name" value={name} onChange={nameValidate} /><br/>
                Email Address<br/>
                <input type="input" className="form-control" id="email"
                placeholder="Enter Email" value={email} onChange= {emailValidate} /><br/>
                Password<br/>
                <input type="password" className="form-control" id="password"
                placeholder="Enter Password" value={password} onChange= {buttonEnable}  /><br/>
                <button type="submit" className="btn btn-light" disabled={buttonStatus} onClick={handleCreate}>Create Account</button>

                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
        
      />
    )
}