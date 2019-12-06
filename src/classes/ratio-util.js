/**
	Provides utility functions for ratio scaling.
	
	@author Aaron Clinger
	@version 04/03/09
	@Ported from AS3 CasaLib Library by Steve Kudirka
*/
export class RatioUtil {
    
    /**
		Determines the ratio of width to height.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
	*/
	widthToHeight(size) {
		return size.width / size.height;
	}
	
	/**
		Determines the ratio of height to width.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
	*/
	heightToWidth(size) {
		return size.height / size.width;
	}
	
	/**
		Scales an area's width and height while preserving aspect ratio.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
		@param amount: The amount you wish to scale by.
		@param snapToPixel: Force the scale to whole pixels <code>true</code>, or allow sub-pixels <code>false</code>.
	*/
	/*this.scale = function(size, percent, snapToPixel) {
		if(snapToPixel==null) snapToPixel = true;
		return _defineRect(size, size.width * percent, size.height * percent, snapToPixel);
	}*/
	
	/**
		Scales the width of an area while preserving aspect ratio.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
		@param height: The new height of the area.
		@param snapToPixel: Force the scale to whole pixels <code>true</code>, or allow sub-pixels <code>false</code>.
	*/
	scaleWidth(size, height, snapToPixel=true) {
		return this._defineRect(size, height * this.widthToHeight(size), height, snapToPixel);
	}
	
	/**
		Scales the height of an area while preserving aspect ratio.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
		@param width: The new width of the area.
		@param snapToPixel: Force the scale to whole pixels <code>true</code>, or allow sub-pixels <code>false</code>.
	*/
	scaleHeight(size, width, snapToPixel=true) {
		return this._defineRect(size, width, width * this.heightToWidth(size), snapToPixel);
	}
	
	/**
		Resizes an area to fill the bounding area while preserving aspect ratio.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
		@param bounds: The area to fill.
		@param snapToPixel: Force the scale to whole pixels <code>true</code>, or allow sub-pixels <code>false</code>.
	*/
	scaleToFill(size, bounds, snapToPixel=true) {
		let scaled = this.scaleHeight(size, bounds.width, snapToPixel);
		
		if (scaled.height < bounds.height){
            scaled = this.scaleWidth(size, bounds.height, snapToPixel);
        }
		
		return scaled;
	}
	
	/**
		Resizes an area to the maximum size of a bounding area without exceeding while preserving aspect ratio.
		
		@param size: The area's width and height expressed as a <code>Size</code>.
		@param bounds: The area the rectangle needs to fit within expressed as a <code>Size</code>.
		@param snapToPixel: Force the scale to whole pixels <code>true</code>, or allow sub-pixels <code>false</code>.
	*/
	scaleToFit(size, bounds, snapToPixel=true) {
		let scaled = this.scaleHeight(size, bounds.width, snapToPixel);
		
		if (scaled.height > bounds.height)
			scaled = this.scaleWidth(size, bounds.height, snapToPixel);
		
		return scaled;
	}
	
	_defineRect(size, width, height, snapToPixel=true) {
		const scaled = size.clone();
		scaled.width = snapToPixel ? Math.round(width) : width;
		scaled.height = snapToPixel ? Math.round(height) : height;
		return scaled;
	}
}

export class Size {
    constructor(width, height){
        this.width = width;
	    this.height = height;
    }
	
    clone(){
		return new Size(this.width, this.height);	
	}
}

const ratioUtil = new RatioUtil();
export default ratioUtil;