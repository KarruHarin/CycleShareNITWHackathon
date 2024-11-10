import { Booking } from "../models/bookings.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import SocketService from "../services/socket.service.js";
import { socketService } from "../app.js";
import { User } from "../models/user.model.js";
import { Cycle } from "../models/cycle.model.js";
const bookACycle = async (req, res) => {
  try {
    const { lender, tenant, cycle, bookingDate, bookingTimeSlot, bookingCost } = req.body;

    // Await the user lookup to check coins
    const user = await User.findById(lender);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Lender not found' });
    }

    const cycle1 = await Cycle.findById(cycle);
    cycle1.isAvailable = false;

    cycle1.save();

    // if (bookingCost > user.coins) {
    //   return res.json({
    //     success: false,
    //     message: "Insufficient balance"
    //   });
    // }

    // Create new booking
    const newBooking = new Booking({
      lender,
      tenant,
      cycle,
      bookingDate,
      bookingTimeSlot,
      bookingCost,
      status: "pending"
    });

    await newBooking.save(); // Save the new booking

    const notificationSent = socketService.sendNotification(lender, tenant, {
      type: 'new_booking_request',
      title: 'New Booking Request',
      message: `New cycle booking request from user ${tenant}`,
      bookingDetails: {
        cycle,
        bookingDate,
        bookingTimeSlot,
        bookingCost,
        tenant
      },
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: notificationSent ? 'Booking request sent to lender' : 'Booking created but lender is offline',
      newBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
};



const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status, lender, tenant, bookingCost } = req.body;

    // Await to find the booking and update status
    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find lender and tenant to update coins
    const lenderUser = await User.findById(lender);
    const tenantUser = await User.findById(tenant);

    if (!lenderUser || !tenantUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (status === 'accepted') {
      // // Update coins for lender and tenant
      // lenderUser.coins += bookingCost;
      // tenantUser.coins -= bookingCost;

      // Save updated user data
      await lenderUser.save();
      await tenantUser.save();

      // Send booking confirmation notification to tenant
      socketService.sendNotification(tenant, lender, {
        type: 'booking_confirmed',
        title: 'Booking Confirmed!',
        message: `Your cycle booking #${bookingId} has been accepted`,
        bookingId,
        timestamp: new Date().toISOString()
      });
    } else if (status === 'rejected') {
      // Send booking rejection notification to tenant
      socketService.sendNotification(tenant, lender, {
        type: 'booking_rejected',
        title: 'Booking Not Available',
        message: `Your cycle booking #${bookingId} could not be confirmed`,
        bookingId,
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      updatedBooking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export {updateBookingStatus,bookACycle}










