const prisma = require("../utils/client");

const createBooking = async (req, res) => {
  try {
    console.log("DEBUG BODY:", req.body);

    const { mentorId, subjectId, scheduleTime } = req.body;
    const studentId = req.user.id;

    if (!mentorId || !subjectId || !scheduleTime) {
      return res.status(400).json({
        message:
          "Data tidak lengkap! Pastikan mentorId, subjectId, dan scheduleTime diisi dengan benar.",
      });
    }

    const finalDate = new Date(scheduleTime);
    if (isNaN(finalDate.getTime())) {
      return res.status(400).json({ message: "Format tanggal salah!" });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        mentorId: parseInt(mentorId),
        scheduleTime: finalDate,
        status: { not: "REJECTED" },
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Mentor sibuk di jam tersebut!" });
    }

    const newBooking = await prisma.booking.create({
      data: {
        studentId,
        mentorId: parseInt(mentorId),
        subjectId: parseInt(subjectId),
        scheduleTime: finalDate,
      },
    });

    res.status(201).json({
      message: "Booking Berhasil! 🚀",
      data: newBooking,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Gagal booking", error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const { id, role } = req.user;

    const filter = role === "STUDENT" ? { studentId: id } : { mentorId: id };

    const bookings = await prisma.booking.findMany({
      where: filter,
      include: {
        subject: true,
        student: {
          select: { name: true, email: true },
        },
        mentor: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: bookings });
  } catch (error) {
    res.status(500).json({ message: "Gagal ambil data", error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const mentorId = req.user.id;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Status harus APPROVED atau REJECTED" });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: parseInt(bookingId),
        mentorId: mentorId,
      },
      data: { status },
    });

    res.json({
      message: `Booking berhasil di-${status}`,
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update status (Mungkin bukan murid kamu?)",
      error: error.message,
    });
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus };
