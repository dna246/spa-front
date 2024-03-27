import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components';


const StyledLabel = styled.label`
  color: #BD195D;
  display: block;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #d1d5db; 
  border-radius: 0.375rem; 
  margin-top: 10px;
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const TimeSlotButton = styled.button`
  padding: 10px;
  margin: 3px;
  border-radius: 5px;
  cursor: pointer;
  ${props => props.$isSelected ? `
  border-color: #c23485;
  background: #c23485;
  color: #fff;
  ` : `
  border-color: transparent;
  background: #f8f9fa;
  color: #000;
  `}

  ${props => props.$isDisabled ? `
  cursor: not-allowed;
  opacity: 0.5;
  background: #eee
  ` : ''}
  
`;



export default function BookingForm({ setDate, selectedDate, selectedTimeSlot, setSelectedTimeSlot }) {
    const today = new Date();
    const currentHour = new Date().getHours();

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 2);

    const minDateStr = today.toISOString().split('T')[0];
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const isTodaySelected = selectedDate === today.toISOString().split('T')[0];

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 10; hour <= 20; hour++) {
            if (!isTodaySelected || hour > currentHour) {
                slots.push(`${hour.toString().padStart(2, '0')}:00`);
                if (hour < 20) {
                    slots.push(`${hour.toString().padStart(2, '0')}:30`);
                }
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    useEffect(() => {
        if (selectedTimeSlot && !timeSlots.includes(selectedTimeSlot)) {
            setSelectedTimeSlot('');
        }
    }, [selectedDate, timeSlots]);
    const handleTime = (slot) => {
        setSelectedTimeSlot(slot)
        console.log(slot)
    }

    return (
        <>
            <StyledLabel htmlFor="bookingDate">Chọn ngày</StyledLabel>
            <StyledInput
                type="date"
                id="bookingDate"
                name="bookingDate"
                min={minDateStr}
                max={maxDateStr}
                value={selectedDate}
                onChange={setDate}
                required
            />

            <StyledLabel>Chọn giờ</StyledLabel>

            <TimeSlotGrid>
                {timeSlots.map((slot) => (
                    <TimeSlotButton
                        type="button"
                        key={slot}
                        $isSelected={selectedTimeSlot === slot}
                        $isDisabled={isTodaySelected && new Date().getHours() >= parseInt(slot)}
                        onClick={() => !isTodaySelected || new Date().getHours() < parseInt(slot) ? handleTime(slot) : null}
                        required
                    >
                        {slot}
                    </TimeSlotButton>
                ))}
            </TimeSlotGrid>

        </>
    );
}
