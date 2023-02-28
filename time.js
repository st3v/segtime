const MINUTE_IN_MILLIS = 60 * 1000;
const HOUR_IN_MILLIS = 60 * MINUTE_IN_MILLIS;
const DAY_IN_MILLIS = 24 * HOUR_IN_MILLIS;
const TWELVE_HOURS_IN_MILLIS = 12 * HOUR_IN_MILLIS;

class Time {
    constructor(x, y, maxLen, color = 0) {
        this.x = x;
        this.y = y;
        this.maxLen = maxLen;
        this.color = color;
    }

    update(date) {
        const angles = [
            this.getSecondsAngle(date),
            this.getMinutesAngle(date),
            this.getHoursAngle(date),
            this.getDaysAngle(date),
            this.getMonthsAngle(date)
        ]

        var alpha = 255;
        var weight = 5;
        
        this.clock = null;
        for (let i=0; i<angles.length; i++) {
            this.clock = new Segment(
                this.x, 
                this.y, 
                this.maxLen/angles.length, 
                weight, 
                angles[i], 
                [this.color[0], this.color[1], this.color[2], alpha], 
                this.clock
            );
            alpha -= 40;
            weight += 2;
        }
    }

    show() {
        if (this.clock != null) {
            this.clock.show();
        }
    }

    endPos() {
        if (this.clock != null) {
            return this.clock.endPos();
        }

        return createVector(this.x, this.y)
    }

    getSecondsAngle(date) {
        return radians(map(this.getSecondsInMillis(date), 0, MINUTE_IN_MILLIS, -90, 270));
    }
      
    getMinutesAngle(date) {
        return radians(map(this.getMinutesInMillis(date), 0, HOUR_IN_MILLIS, -90, 270));
      }
      
    getHoursAngle(date) {
        return radians(map(this.getHoursInMillis(date)%TWELVE_HOURS_IN_MILLIS, 0, TWELVE_HOURS_IN_MILLIS, -90, 270));      
    }
      
    getDaysAngle(date) {
        return radians(map(this.getDaysInMillis(date), 0, this.numDaysInCurrentMonth(date) * DAY_IN_MILLIS, -90, 270));
    }
      
    getMonthsAngle(date) {
        return radians(map(this.getMonthInMillis(date), 0, this.numDaysInCurrentYear(date) * DAY_IN_MILLIS, -90, 270));
    }
      
    getMonthInMillis(date) {
        return this.getDayInCurrentYear(date) * DAY_IN_MILLIS + this.getHoursInMillis(date);
    }
      
    getDaysInMillis(date) {
        return date.getDate() * DAY_IN_MILLIS + this.getHoursInMillis(date);
    }
      
    getHoursInMillis(date) {
        return date.getHours() * HOUR_IN_MILLIS + this.getMinutesInMillis(date);
    }
      
    getMinutesInMillis(date) {
        return date.getMinutes() * MINUTE_IN_MILLIS + this.getSecondsInMillis(date);
    }
      
    getSecondsInMillis(date) {
        return date.getSeconds() * 1000 + date.getMilliseconds();
    }
      
    getDayInCurrentYear(date) {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }
      
    numDaysInCurrentYear(date) {
        return (Date.UTC(date.getFullYear(), 11, 31) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000
    }
      
    numDaysInCurrentMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
}