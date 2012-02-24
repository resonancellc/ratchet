var expect = require('chai').expect,
    xyz1 = new XYZ('translate', { x: 50, y: 120 });

describe('ratchet xyz subtraction', function() {
    it('should be able decrease all values by a single numeric value', function() {
        var xyz = xyz1.sub(10);
        
        expect(xyz.x == 40).to.be.ok;
        expect(xyz.y == 110).to.be.ok;
        expect(xyz.x.units).to.equal('px');
        expect(xyz.y.units).to.equal('px');
        expect(xyz.z).to.not.exist;
    });
    
    it('should be able to decrease specified values with a composite value', function() {
        var xyz = xyz1.sub({ x: 20, y: 40 });
        
        expect(xyz.x == 30).to.be.ok;
        expect(xyz.y == 80).to.be.ok;
        expect(xyz.x.units).to.equal('px');
        expect(xyz.y.units).to.equal('px');
        expect(xyz.z).to.not.exist;
    });
});