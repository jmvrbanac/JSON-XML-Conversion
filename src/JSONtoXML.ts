/**
 * JSON <--> XML Conversion Library
 * Author: John Vrbanac <john.vrbanac@linux.com>
 * License: MIT License
 * Copyright 2012 John Vrbanac
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */ 

export class JSONtoXML {

	//TODO: Make this more robust
	private static buildAttributeString(name:string, value:string) {
		return " " + name + "=\"" + value +"\""; 
	}

	private static buildNodeString(name:string, attributes:string, inner:string):string {
		var result:string;
		result  = "<" + name + attributes +">";
		result += inner;
		result += "</" + name + ">";

		return result;
	}

	private static convertArray(children:any[]):string {
		var result:string = "";
		for (var i:number = 0; i < children.length; i++) {
			result += JSONtoXML.jsonConvert("", children[i]);
		}
		return result;
	}

	private static jsonConvert(name:string, obj:Object):string {
		var attributeXML:string = "";
		var innerXML:string = "";
		var result:string = "";

		for (var childName in obj) {
			var child = obj[childName];
			if (child instanceof Array) {
				innerXML += JSONtoXML.convertArray(child);
			} else if (typeof child === "object") {
				innerXML += JSONtoXML.jsonConvert(childName, child);
			} else {
				attributeXML += JSONtoXML.buildAttributeString(childName, child);
			}
		}

		var result:string;
		if (name === "") {
			result = innerXML;
		} else {
			result = JSONtoXML.buildNodeString(name, attributeXML, innerXML)
		}

		return result;
	}

	public static convertToXML(jsonObj:Object):string {
		// Make sure that we are actually dealing with an object
		if (typeof jsonObj !== "object") {
			return null;
		}
		
		var result:string = JSONtoXML.jsonConvert("", jsonObj);
		return result;
	}
}