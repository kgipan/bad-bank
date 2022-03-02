function Deposit() {
	const [show, setShow]                   = React.useState(true);
	const [status, setStatus]               = React.useState('');
	const [user, setUser]                   = React.useState('');
	const [loginEmail, setLoginEmail]       = React.useState('');
	const [loginPassword, setLoginPassword] = React.useState('');
	const [balance, setBalance]             = React.useState('');
	const [deposit, setDeposit]             = React.useState('');
    const [isValid, setIsValid]             = React.useState(false);
	const ctx                               = React.useContext(UserContext);
    //const button = document.getElementById('button');
    const [buttonStatus, setButtonStatus]   = React.useState(true);

	if (show) {
	  for (const { name, email, password, balance, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setUser(name);
		  setLoginEmail(email);
		  setLoginPassword(password);
		  setBalance(balance);
		  return;
		}
	  }
	}
  
    function handleChange(e){
        if(e.target.value === null) { 
            setButtonStatus(true)
            setDeposit(e.currentTarget.value)
            
        } else {
            setButtonStatus(false)
            setDeposit(e.currentTarget.value)
            
        }
       
    }

	function HandleDeposit() {
	  if (!isNaN(deposit) && deposit > 0) {
		let newBalance = Number(balance) + Number(deposit);
		let tracker = false;
		setBalance(newBalance);
		setDeposit('');
		setStatus(`$${deposit} has been successfully deposited into your account`);
        setTimeout(()=> setStatus(''), 6000);
        
  
		
		for (const { email, password, balance } of ctx.users) {
		  if (loginEmail === email && loginPassword === password) {
			for (var i = 0, length = ctx.users.length; i < length; i++) {
			  if (ctx.users[i].email === loginEmail) {
				ctx.users[i].balance = Number(newBalance);
  
				tracker = true;
			  }
			}
		  }
		}
  
		if (tracker) {
		  setStatus(`$${deposit} deposited into account`);
		  setTimeout(() => setStatus(''), 5000);
		  setDeposit('');
		  setBalance(Number(newBalance));
          setButtonStatus(true);
		}
	  } else if (!isNaN(deposit)) {
		setStatus('Transaction Failed. Amount must be greater than $0.00.');
		setDeposit('');
		setTimeout(() => setStatus(''), 5000);
        setButtonStatus(true);
        alert(`Error: deposit amount must be greater than $0.00`);
	  } else {
		setStatus('Transaction Failed. Deposit amount must be a numerical value.');
		setDeposit('');
		setTimeout(() => setStatus(''), 5000);
        setButtonStatus(true);
        alert(`Error: deposit amount must be a numerical value.`);
	  }
	  return;
	}
  
	return (
	  <Card
		bgcolor="warning"
		txtcolor="black"
		header="Deposit"
		status={status}
		body={ 
            show ? (
            <>
			  
            You must <a
              href="#/login/"
              className="btnDeposit"
              data-toggle="tooltip"
              title="Login to your account"
            > Login
            </a>{' '} to make a transaction.
            <br />
            <br />
          </>
        ) : (
			<>
			  <h4>Current Balance: ${balance}</h4>
			  <br />
			  Deposit Amount:
			  <br />
			  <input
				type="input"
				className="form-control"
				id="deposit"
				placeholder="$0.00"
				value={deposit}
				onChange={handleChange}
			  />
			  <br />
			  <>
				<button
                  id="button"  
				  type="submit"
				  className="btn btn-light"
                  disabled={buttonStatus}
				  onClick={HandleDeposit}
				>
				  Deposit
				</button>
				<br />
				<br />
				<div className="text-left"></div>
			  </>
			</>
		  )
		}
	  />
	);
  }

