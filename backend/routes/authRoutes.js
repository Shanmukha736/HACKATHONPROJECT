router.post('/login', async (req, res) => {
  try {
    console.log('Login request:', req.body);
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Send proper data for frontend
    res.status(200).json({
      message: 'Login successful',
      token: 'fake-jwt-token', // no JWT for now
      role: user.role,
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
