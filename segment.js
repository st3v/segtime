class Segment {
    constructor(x, y, len, weight, angle, color, child = null, scale = false) {
        this.start = createVector(x, y);
        this.len = len;
        this.weight = weight;
        this.xoff = 0;
        this.baseAngle = 0;
        this.angle = angle;
        this.color = color;
        this.child = child;
        this.scale = scale;
        this.recalc();
    }

    endPos() {
        if (this.child != null) {
            return this.child.endPos();
        }

        const dx = this.actualLen() * cos(this.actualAngle());
        const dy = this.actualLen() * sin(this.actualAngle());
        return createVector(this.start.x + dx, this.start.y + dy);
    }

    actualAngle() {
        return this.angle + this.baseAngle;
    }

    repos(x, y, baseAngle) {
        this.start = createVector(x, y);
        // this.baseAngle = baseAngle;
        this.recalc();
    }

    actualLen() {
        if (!this.scale) {
            return this.len;
        }

        var scale = 1 / sin(this.actualAngle());
        var angle = (this.actualAngle() + radians(45)) % radians(180);
        if (angle > radians(0) && (angle <= radians(90))) {
            scale = 1 / cos(this.actualAngle());
        }
        return this.len * Math.abs(scale);
    }

    recalc() {
        const dx = this.actualLen() * cos(this.actualAngle());
        const dy = this.actualLen() * sin(this.actualAngle());
        this.end = createVector(this.start.x + dx, this.start.y + dy);

        if (this.child != null) {
            this.child.repos(this.end.x, this.end.y, this.actualAngle());
        }
    }

    wiggle() {
        this.angle = map(noise(this.xoff), 0, 1, -1, 1);
        this.xoff += 0.005;
        this.recalc();

        if (this.child != null) {
            this.child.wiggle();
        }
    }

    show() {
        push();
        stroke(this.color);
        strokeWeight(this.weight);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        stroke(255);
        strokeWeight(2);
        point(this.start.x, this.start.y);
        pop();

        if (this.child != null) {
            this.child.show()
        }
    }
}