import Group from "../models/group.model.js";
import cloudinary from "../lib/cloudinary.js";


// Create a new Group
export const createGroup = async (req, res, next) => {
  const { name, members, image } = req.body;

  if (!name || !members || members.length < 2) {
    return res.status(400).json({ message: "A group must have a name and at least 2 members." });
  }

  try {
    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);

    // Create the new group
    const newGroup = new Group({ name, members, image: uploadResponse.secure_url });

    // Save the group to the database
    await newGroup.save();

    // Respond with success
    res.status(201).json({ message: "Group created successfully", newGroup });
  } catch (error) {
    next(error);
  }
};

// Get all groups
export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find(); // Fetch groups from the database
    res.status(200).json(groups); // Send the groups as a JSON response
  } catch (error) {
    next(error); // Pass the error to Express error handler
  }
};


// Delete a group
export const deleteGroup = async (req, res, next) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByIdAndDelete(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Add one or multiple users to a group
export const addUser = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { usersId } = req.body;

    // Find group by ID
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Use Set for better efficiency
    const existingMembers = new Set(group.members.map(id => id.toString()));
    const nonExistingMember = usersId.filter(userid => !existingMembers.has(userid));

    if (nonExistingMember.length === 0) {
      return res.status(400).json({ message: "All users are already members of this group" });
    }

    // Add non-existing users to the group
    group.members.push(...nonExistingMember);

    // Save the updated group
    await group.save();
    res.status(200).json({ message: "Users added to the group successfully", group });
  } catch (error) {
    next(error);
  }
};

// Send a message in a Group
export const sendMessage = async (req, res) => {
    const {  text, image } = req.body;
    const senderId = req.user._id;
    const {groupId} = req.params;
    try {
      // Find the group by ID
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
  
      // Check if the sender is a member of the group
      if (!group.members.includes(senderId)) {
        return res.status(403).json({ error: "User is not a member of the group" });
      }
  
      // Create the new message object
      const newMessage = {
        senderId,
        text,
        image,
        createdAt: new Date(),
      };
  
      // Push the new message into the group's messages array
      group.messages.push(newMessage);
  
      // Save the updated group
      await group.save();
  
      // Send the success response
      return res.status(200).json({ message: "Message sent successfully", group });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
