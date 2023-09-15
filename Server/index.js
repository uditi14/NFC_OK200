// reg
app.post("/register", async (req, res) => {
  try {
    const existinguser = await user.findOne({
      email: req.body.email,
    });
    if (existinguser) {
      return res.status(500).json("User already exist ");
    }
    const salt = 10;
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    res.json({ status: "ok", newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//login
app.post("/login", async (req, res) => {
  try {
    const salt = 10;
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // console.log(hashedPass);
    const existinguser = await user.findOne({
      email: req.body.email,
    });
    if (!existinguser) {
      return res.status(500).json("Email id doesnt exist");
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      existinguser.password
    );
    if (isValidPassword) {
      const token = jwt.sign(
        {
          name: existinguser.name,
          email: existinguser.email,
          id: existinguser._id,
        },
        "secret123"
      );
      return res.json({ status: "ok", existinguser: token });
    } else {
      return res.json({ status: "error", existinguser: false });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//logout
app.get("/logout", async (req, res) => {
  try {
    res.json({ message: "logout succesful" });
  } catch (error) {}
});
