// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.mvc.controllers.Widget' );

goog.require( 'goog.Promise' );
goog.require( 'goog.net.XhrIo' );
goog.require( 'goog.string' );
goog.require( 'goog.style' );
goog.require( 'goog.graphics' );
goog.require( 'goog.graphics.CanvasGraphics' );
goog.require( 'goog.graphics.CanvasGraphics' );

goog.require( 'zz.environment.services.RAM' );
goog.require( 'zz.controllers.FEBase' );
goog.require( 'zz.mvc.views.Widget' );
goog.require( 'zz.mvc.events.Selected' );
goog.require( 'zz.mvc.models.Stocks' );

/**
 * Widget controller.
 * @param {zz.mvc.models.Widget} model
 * @param opt_dom
 * @constructor
 */
zz.mvc.controllers.Widget = function( model, opt_dom ){

    /**
     * Number of rects to render in tests.
     * @type {number}
     * @private
     */
    this.testRectNumber_ = 1000;

    /**
     * Widget view.
     * @type {zz.mvc.views.Widget}
     */
    var view = zz.mvc.views.Widget.getInstance( );
    goog.base( this, model, view, opt_dom );
};
goog.inherits( zz.mvc.controllers.Widget, zz.controllers.FEBase );

/**
 * Render widget.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.instantiateWidget = function( widget ){

    if( widget.type === 'scatter' ){

        this.renderScatterplotMatrix( widget );

    }else if( widget.type === 'piechart' ){

        this.renderPieChart( widget );

    }else if( widget.type === 'demoD3' ){

        this.renderDemoD3Chart( widget );

    }else if( widget.type === 'testHC' ){

        this.testHC( widget );

    }else if( widget.type === 'testD3' ){

        this.testD3( widget );

    }else if( widget.type === 'testSVG' ){

        this.testGclSvg( widget );

    }else if( widget.type === 'testCanvas' ){

        this.testGclCanvas( widget );
    }
};

/**
 * Render scatterplot matrix widget.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.renderScatterplotMatrix = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var data = JSON.parse( widget.data );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var size = width / 5;
    var padding = 15;
    var x = d3.scale.linear( ).range( [ padding / 2, size - padding / 2 ] );
    var y = d3.scale.linear( ).range( [size - padding / 2, padding / 2 ] );
    var xAxis = d3.svg.axis( ).scale( x ).orient( "bottom" ).ticks( 3 );
    var yAxis = d3.svg.axis( ).scale( y ).orient( "left" ).ticks( 2 );
    var color = d3.scale.category10( );
    var domainByTrait = { };
    var traits = d3.keys( data[ 0 ] ).filter( function( d ){ return d !== "species"; } );
    var n = traits.length;
    var brushCell;

    traits.forEach( function( trait ){

        domainByTrait[ trait ] = d3.extent( data, function( d ){ return d[ trait ]; } );
    } );
    xAxis.tickSize( size * n );
    yAxis.tickSize( -size * n );
    var brush = d3.svg.brush( )

        .x(x)
        .y(y)
        .on( "brushstart", brushstart )
        .on( "brush", brushmove )
        .on( "brushend", brushend );

    var svg = d3.select( mvc.view ).append( "svg" )

        .attr( "width", size * n + padding )
        .attr( "height", size * n + padding )
        .append( "g" )
        .attr( "transform", "translate(" + padding + "," + padding / 2 + ")" );

    svg.selectAll( "." + goog.getCssName( "x" ) + "." + goog.getCssName( "axis" ) )

        .data( traits )
        .enter( ).append( "g" )
        .attr( "class", goog.getCssName( "x" ) + " " + goog.getCssName( "axis" ) )
        .attr( "transform", function( d, i ){

            return "translate(" + ( n - i - 1 ) * size + ",0)";
        } )
        .each( function( d ){

            x.domain( domainByTrait[ d ] );
            d3.select( this ).call( xAxis );
        });

    svg.selectAll( "." + goog.getCssName( "y" ) + "." + goog.getCssName( "axis" ) )

        .data( traits )
        .enter( ).append( "g" )
        .attr( "class", goog.getCssName( "y" ) + " " + goog.getCssName( "axis" ) )
        .attr( "transform", function( d, i ){

            return "translate(0," + i * size + ")";
        } )
        .each( function( d ){

            y.domain( domainByTrait[ d ] );
            d3.select( this ).call( yAxis );
        } );

    var cell = svg.selectAll( "." + goog.getCssName( "cell" ) )

        .data( cross( traits, traits ) )
        .enter( ).append( "g" )
        .attr( "class", goog.getCssName( "cell" ) )
        .attr( "transform", function( d ){

            return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")";
        } )
        .each( plot );

    // Titles for the diagonal.
    cell.filter( function( d ){

        return d.i === d.j;
    } )
        .append( "text" )
        .attr( "x", padding )
        .attr( "y", padding )
        .attr( "dy", ".71em" )
        .text( function( d ){

            return d.x;
        } );

    cell.call( brush );

    function plot( p ){

        var cell = d3.select( this );
        x.domain( domainByTrait[ p.x ] );
        y.domain( domainByTrait[ p.y ] );
        cell.append( "rect" )

            .attr( "class", goog.getCssName( "frame" ) )
            .attr( "x", padding / 2 )
            .attr( "y", padding / 2 )
            .attr( "width", size - padding )
            .attr( "height", size - padding );

        cell.selectAll( "circle" )

            .data( data )
            .enter( ).append( "circle" )
            .attr( "cx", function( d ){

                return x( d[ p.x ] );
            } )
            .attr( "cy", function( d ){

                return y( d[ p.y ] );
            } )
            .attr( "r", 2 )
            .style( "fill", function( d ){

                return color( d[ 'species' ] );
            } );
    }

    // Clear the previously-active brush, if any.
    function brushstart( p ){

        if( brushCell !== this ){

            d3.select( brushCell ).call( brush.clear( ) );
            x.domain( domainByTrait[ p.x ] );
            y.domain( domainByTrait[ p.y ] );
            brushCell = this;
        }
        // Workaround to add compiled class name.
        svg.selectAll( ".extent" ).attr( "class", "extent " + goog.getCssName( "extent" ) );
    }

    // Highlight the selected circles.
    function brushmove( p ){

        var e = brush.extent( );
        svg.selectAll( "circle" ).classed( goog.getCssName( "hidden" ), function( d ){

            return e[ 0 ][ 0 ] > d[ p.x ] || d[ p.x ] > e[ 1 ][ 0 ]
                || e[ 0 ][ 1 ] > d[ p.y ] || d[ p.y ] > e[ 1 ][ 1 ];
        } );
    }

    // If the brush is empty, select all circles.
    function brushend( p ){

        var s = [ ];
        var e = brush.extent( );
        svg.selectAll( "circle" ).classed( goog.getCssName( "hidden" ), function( d ){

            if( !(e[ 0 ][ 0 ] > d[ p.x ] || d[ p.x ] > e[ 1 ][ 0 ] ||
                e[ 0 ][ 1 ] > d[ p.y ] || d[ p.y ] > e[ 1 ][ 1 ] ) ){

                s.push( d );
            }
        } );
        if( brush.empty( ) ){

            svg.selectAll( "." + goog.getCssName( "hidden" ) )

                .classed( goog.getCssName( "hidden" ), false );
        }
        mvc.controller.dispatchEvent( new zz.mvc.events.Selected( JSON.stringify( s ) ) );
    }
    function cross( a, b ){

        var c = [], n = a.length, m = b.length, i, j;
        for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
        return c;
    }
};

/**
 * Render pie chart widget.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.renderPieChart = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var data = JSON.parse( widget.data );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var height = width - 100;
    var radius = Math.min( width, height ) / 2;
    var color = d3.scale.category10( );
    var arc = d3.svg.arc( )

        .outerRadius( radius - 10 )
        .innerRadius( 0 );

    var labelArc = d3.svg.arc( )

        .outerRadius( radius - 40 )
        .innerRadius( radius - 40 );

    var pie = d3.layout.pie( )

        .sort( null )
        .value( function( d ){

            return d[ 'total' ];
        } );

    goog.dom.removeChildren( mvc.view );
    var svg = d3.select( mvc.view ).append( "svg" )

        .attr( "width", width )
        .attr( "height", height )
        .append( "g" )
        .attr( "transform", "translate(" + width / 2 + "," + height / 2 + ")" );

    var g = svg.selectAll( "." + goog.getCssName( "arc" ) )

        .data( pie( data ) )
        .enter( ).append( "g" )
        .attr( "class", goog.getCssName( "arc" ) );

    g.append( "path" )

        .attr( "d", arc )
        .style( "fill", function( d ){

            return color( d.data[ 'species' ] );
        } );

    g.append( "text" )

        .attr( "transform", function( d ){

            return "translate(" + labelArc.centroid( d ) + ")";
        } )
        .attr( "dy", ".35em" )
        .text( function( d ){

            return d.data[ 'species' ];
        } );

    function type( d ){

        d.species= +d[ 'total' ];
        return d;
    }
};

/**
 * Render D3 demo widget.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.renderDemoD3Chart = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var height = 300;
    var m = [20, 20, 30, 20],
        w = width - m[1] - m[3],
        h = height - m[0] - m[2];

    var x,
        y,
        duration = 1500,
        delay = 500;

    var color = d3.scale.category10();

    var svg = d3.select( mvc.view ).append( "svg" )

        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    var stocks,
        symbols;

// A line generator, for the dark stroke.
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d[ 'date' ]); })
        .y(function(d) { return y(d[ 'price' ]); });

// A line generator, for the dark stroke.
    var axis = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d[ 'date' ]); })
        .y(h);

// A area generator, for the dark stroke.
    var area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) { return x(d[ 'date' ]); })
        .y1(function(d) { return y(d[ 'price' ]); });

    d3.csv("/lib/resources/stocks.csv", function(data) {

        var parse = d3.time.format("%b %Y").parse;

        // Nest stock values by symbol.
        symbols = d3.nest()
            .key(function(d) { return d[ 'symbol' ]; })
            .entries(stocks = data);

        // Parse dates and numbers. We assume values are sorted by date.
        // Also compute the maximum price per symbol, needed for the y-domain.
        symbols.forEach(function(s) {
            s.values.forEach(function(d) { d[ 'date' ] = parse(d[ 'date' ]); d[ 'price' ] = +d[ 'price' ]; });
            s.maxPrice = d3.max(s.values, function(d) { return d[ 'price' ]; });
            s.sumPrice = d3.sum(s.values, function(d) { return d[ 'price' ]; });
        });

        // Sort by maximum price, descending.
        symbols.sort(function(a, b) { return b.maxPrice - a.maxPrice; });

        var g = svg.selectAll("g")
            .data(symbols)
            .enter().append("g")
            .attr("class", goog.getCssName( "symbol" ) );

        // Workaround to add compiled class name.
        // svg.selectAll( ".line" ).attr( "class", "line " + goog.getCssName( "line" ) );

        setTimeout(lines, duration);
    });

    function lines() {
        x = d3.time.scale().range([0, w - 60]);
        y = d3.scale.linear().range([h / 4 - 20, 0]);

        // Compute the minimum and maximum date across symbols.
        x.domain([
            d3.min(symbols, function(d) { return d.values[0][ 'date' ]; }),
            d3.max(symbols, function(d) { return d.values[d.values.length - 1][ 'date' ]; })
        ]);

        var g = svg.selectAll("." + goog.getCssName( "symbol" ))
            .attr("transform", function(d, i) { return "translate(0," + (i * h / 4 + 10) + ")"; });

        g.each(function(d) {
            var e = d3.select(this);

            e.append("path")
                .attr("class", goog.getCssName( "line" ) );

            e.append("circle")
                .attr("r", 5)
                .style("fill", function(d) { return color(d.key); })
                .style("stroke", "#000")
                .style("stroke-width", "2px");

            e.append("text")
                .attr("x", 12)
                .attr("dy", ".31em")
                .text(d.key);
        });

        function draw(k) {
            g.each(function(d) {
                var e = d3.select(this);
                y.domain([0, d.maxPrice]);

                e.select("path")
                    .attr("d", function(d) { return line(d.values.slice(0, k + 1)); });

                e.selectAll("circle, text")
                    .data(function(d) { return [d.values[k], d.values[k]]; })
                    .attr("transform", function(d) { return "translate(" + x(d[ 'date' ]) + "," + y(d[ 'price' ]) + ")"; });
            });
        }

        var k = 1, n = symbols[0].values.length;
        d3.timer(function() {
            draw(k);
            if ((k += 2) >= n - 1) {
                draw(n - 1);
                setTimeout(horizons, 500);
                return true;
            }
        });
    }

    function horizons() {
        svg.insert("defs", "." + goog.getCssName( "symbol" ) )
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", w)
            .attr("height", h / 4 - 20);

        var color = d3.scale.ordinal()
            .range(["#c6dbef", "#9ecae1", "#6baed6"]);

        var g = svg.selectAll("." + goog.getCssName( "symbol" ))
            .attr("clip-path", "url(#clip)");

        area
            .y0(h / 4 - 20);

        g.select("circle").transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + (w - 60) + "," + (-h / 4) + ")"; })
            .remove();

        g.select("text").transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + (w - 60) + "," + (h / 4 - 20) + ")"; })
            .attr("dy", "0em");

        g.each(function(d) {
            y.domain([0, d.maxPrice]);

            d3.select(this).selectAll(".area")
                .data(d3.range(3))
                .enter().insert("path", "." + goog.getCssName( "line" ) )
                .attr("class", "area")
                .attr("transform", function(d) { return "translate(0," + (d * (h / 4 - 20)) + ")"; })
                .attr("d", area(d.values))
                .style("fill", function(d, i) { return color(i); })
                .style("fill-opacity", 1e-6);

            y.domain([0, d.maxPrice / 3]);

            d3.select(this).selectAll( "." + goog.getCssName( "line" ) ).transition()
                .duration(duration)
                .attr("d", line(d.values))
                .style("stroke-opacity", 1e-6);

            d3.select(this).selectAll(".area").transition()
                .duration(duration)
                .style("fill-opacity", 1)
                .attr("d", area(d.values))
                .each("end", function() { d3.select(this).style("fill-opacity", null); });
        });

        setTimeout(areas, duration + delay);
    }

    function areas() {
        var g = svg.selectAll("." + goog.getCssName( "symbol" ));

        axis
            .y(h / 4 - 21);

        g.select( "." + goog.getCssName( "line" ) )
            .attr("d", function(d) { return axis(d.values); });

        g.each(function(d) {
            y.domain([0, d.maxPrice]);

            d3.select(this).select( "." + goog.getCssName( "line" ) ).transition()
                .duration(duration)
                .style("stroke-opacity", 1)
                .each("end", function() { d3.select(this).style("stroke-opacity", null); });

            d3.select(this).selectAll(".area")
                .filter(function(d, i) { return i; })
                .transition()
                .duration(duration)
                .style("fill-opacity", 1e-6)
                .attr("d", area(d.values))
                .remove();

            d3.select(this).selectAll(".area")
                .filter(function(d, i) { return !i; })
                .transition()
                .duration(duration)
                .style("fill", color(d.key))
                .attr("d", area(d.values));
        });

        svg.select("defs").transition()
            .duration(duration)
            .remove();

        g.transition()
            .duration(duration)
            .each("end", function() { d3.select(this).attr("clip-path", null); });

        setTimeout(stackedArea, duration + delay);
    }

    function stackedArea() {
        var stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function(d) { return d[ 'date' ]; })
            .y(function(d) { return d[ 'price' ]; })
            .out(function(d, y0, y) { d.price0 = y0; })
            .order("reverse");

        stack(symbols);

        y
            .domain([0, d3.max(symbols[0].values.map(function(d) { return d[ 'price' ] + d.price0; }))])
            .range([h, 0]);

        line
            .y(function(d) { return y(d.price0); });

        area
            .y0(function(d) { return y(d.price0); })
            .y1(function(d) { return y(d.price0 + d[ 'price' ]); });

        var t = svg.selectAll("." + goog.getCssName( "symbol" )).transition()
            .duration(duration)
            .attr("transform", "translate(0,0)")
            .each("end", function() { d3.select(this).attr("transform", null); });

        t.select("path.area")
            .attr("d", function(d) { return area(d.values); });

        t.select("path." + goog.getCssName( "line" ) )
            .style("stroke-opacity", function(d, i) { return i < 3 ? 1e-6 : 1; })
            .attr("d", function(d) { return line(d.values); });

        t.select("text")
            .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d[ 'price' ] / 2 + d.price0) + ")"; });

        setTimeout(streamgraph, duration + delay);
    }

    function streamgraph() {
        var stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function(d) { return d[ 'date' ]; })
            .y(function(d) { return d[ 'price' ]; })
            .out(function(d, y0, y) { d.price0 = y0; })
            .order("reverse")
            .offset("wiggle");

        stack(symbols);

        line
            .y(function(d) { return y(d.price0); });

        var t = svg.selectAll( "." + goog.getCssName( "symbol" ) ).transition()
            .duration(duration);

        t.select("path.area")
            .attr("d", function(d) { return area(d.values); });

        t.select("path." + goog.getCssName( "line" ) )
            .style("stroke-opacity", 1e-6)
            .attr("d", function(d) { return line(d.values); });

        t.select("text")
            .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d[ 'price' ] / 2 + d.price0) + ")"; });

        setTimeout(overlappingArea, duration + delay);
    }

    function overlappingArea() {
        var g = svg.selectAll( "." + goog.getCssName( "symbol" ) );

        line
            .y(function(d) { return y(d.price0 + d[ 'price' ]); });

        g.select( "." + goog.getCssName( "line" ) )
            .attr("d", function(d) { return line(d.values); });

        y
            .domain([0, d3.max(symbols.map(function(d) { return d.maxPrice; }))])
            .range([h, 0]);

        area
            .y0(h)
            .y1(function(d) { return y(d[ 'price' ]); });

        line
            .y(function(d) { return y(d[ 'price' ]); });

        var t = g.transition()
            .duration(duration);

        t.select( "." + goog.getCssName( "line" ) )
            .style("stroke-opacity", 1)
            .attr("d", function(d) { return line(d.values); });

        t.select(".area")
            .style("fill-opacity", .5)
            .attr("d", function(d) { return area(d.values); });

        t.select("text")
            .attr("dy", ".31em")
            .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d[ 'price' ]) + ")"; });

        svg.append("line")
            .attr("class", goog.getCssName( "line" ) )
            .attr("x1", 0)
            .attr("x2", w - 60)
            .attr("y1", h)
            .attr("y2", h)
            .style("stroke-opacity", 1e-6)
            .transition()
            .duration(duration)
            .style("stroke-opacity", 1);

        setTimeout(groupedBar, duration + delay);
    }

    function groupedBar() {
        x = d3.scale.ordinal()
            .domain(symbols[0].values.map(function(d) { return d[ 'date' ]; }))
            .rangeBands([0, w - 60], .1);

        var x1 = d3.scale.ordinal()
            .domain(symbols.map(function(d) { return d.key; }))
            .rangeBands([0, x.rangeBand()]);

        var g = svg.selectAll( "." + goog.getCssName( "symbol" ) );

        var t = g.transition()
            .duration(duration);

        t.select( "." + goog.getCssName( "line" ) )
            .style("stroke-opacity", 1e-6)
            .remove();

        t.select(".area")
            .style("fill-opacity", 1e-6)
            .remove();

        g.each(function(p, j) {
            d3.select(this).selectAll("rect")
                .data(function(d) { return d.values; })
                .enter().append("rect")
                .attr("x", function(d) { return x(d[ 'date' ]) + x1(p.key); })
                .attr("y", function(d) { return y(d[ 'price' ]); })
                .attr("width", x1.rangeBand())
                .attr("height", function(d) { return h - y(d[ 'price' ]); })
                .style("fill", color(p.key))
                .style("fill-opacity", 1e-6)
                .transition()
                .duration(duration)
                .style("fill-opacity", 1);
        });

        setTimeout(stackedBar, duration + delay);
    }

    function stackedBar() {
        x.rangeRoundBands([0, w - 60], .1);

        var stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function(d) { return d[ 'date' ]; })
            .y(function(d) { return d[ 'price' ]; })
            .out(function(d, y0, y) { d.price0 = y0; })
            .order("reverse");

        var g = svg.selectAll( "." + goog.getCssName( "symbol" ));

        stack(symbols);

        y
            .domain([0, d3.max(symbols[0].values.map(function(d) { return d[ 'price' ] + d.price0; }))])
            .range([h, 0]);

        var t = g.transition()
            .duration(duration / 2);

        t.select("text")
            .delay(symbols[0].values.length * 10)
            .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d[ 'price' ] / 2 + d.price0) + ")"; });

        t.selectAll("rect")
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d.price0 + d[ 'price' ]); })
            .attr("height", function(d) { return h - y(d[ 'price' ]); })
            .each("end", function() {
                d3.select(this)
                    .style("stroke", "#fff")
                    .style("stroke-opacity", 1e-6)
                    .transition()
                    .duration(duration / 2)
                    .attr("x", function(d) { return x(d[ 'date' ]); })
                    .attr("width", x.rangeBand())
                    .style("stroke-opacity", 1);
            });

        setTimeout(transposeBar, duration + symbols[0].values.length * 10 + delay);
    }

    function transposeBar() {
        x
            .domain(symbols.map(function(d) { return d.key; }))
            .rangeRoundBands([0, w], .2);

        y
            .domain([0, d3.max(symbols.map(function(d) { return d3.sum(d.values.map(function(d) { return d[ 'price' ]; })); }))]);

        var stack = d3.layout.stack()
            .x(function(d, i) { return i; })
            .y(function(d) { return d[ 'price' ]; })
            .out(function(d, y0, y) { d.price0 = y0; });

        stack(d3.zip.apply(null, symbols.map(function(d) { return d.values; }))); // transpose!

        var g = svg.selectAll( "." + goog.getCssName( "symbol" ) );

        var t = g.transition()
            .duration(duration / 2);

        t.selectAll("rect")
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d.price0 + d[ 'price' ]) - 1; })
            .attr("height", function(d) { return h - y(d[ 'price' ]) + 1; })
            .attr("x", function(d) { return x(d.symbol); })
            .attr("width", x.rangeBand())
            .style("stroke-opacity", 1e-6);

        t.select("text")
            .attr("x", 0)
            .attr("transform", function(d) { return "translate(" + (x(d.key) + x.rangeBand() / 2) + "," + h + ")"; })
            .attr("dy", "1.31em")
            .each("end", function() { d3.select(this).attr("x", null).attr("text-anchor", "middle"); });

        svg.select("line").transition()
            .duration(duration)
            .attr("x2", w);

        setTimeout(donut,  duration / 2 + symbols[0].values.length * 10 + delay);
    }

    function donut() {
        var g = svg.selectAll( "." + goog.getCssName( "symbol" ) );

        g.selectAll("rect").remove();

        var pie = d3.layout.pie()
            .value(function(d) { return d.sumPrice; });

        var arc = d3.svg.arc();

        g.append("path")
            .style("fill", function(d) { return color(d.key); })
            .data(function() { return pie(symbols); })
            .transition()
            .duration(duration)
            .tween("arc", arcTween);

        g.select("text").transition()
            .duration(duration)
            .attr("dy", ".31em");

        svg.select("line").transition()
            .duration(duration)
            .attr("y1", 2 * h)
            .attr("y2", 2 * h)
            .remove();

        function arcTween(d) {
            var path = d3.select(this),
                text = d3.select(this.parentNode.appendChild(this.previousSibling)),
                x0 = x(d.data.key),
                y0 = h - y(d.data.sumPrice);

            return function(t) {
                var r = h / 2 / Math.min(1, t + 1e-3),
                    a = Math.cos(t * Math.PI / 2),
                    xx = (-r + (a) * (x0 + x.rangeBand()) + (1 - a) * (w + h) / 2),
                    yy = ((a) * h + (1 - a) * h / 2),
                    f = {
                        innerRadius: r - x.rangeBand() / (2 - a),
                        outerRadius: r,
                        startAngle: a * (Math.PI / 2 - y0 / r) + (1 - a) * d.startAngle,
                        endAngle: a * (Math.PI / 2) + (1 - a) * d.endAngle
                    };

                path.attr("transform", "translate(" + xx + "," + yy + ")");
                path.attr("d", arc(f));
                text.attr("transform", "translate(" + arc.centroid(f) + ")translate(" + xx + "," + yy + ")rotate(" + ((f.startAngle + f.endAngle) / 2 + 3 * Math.PI / 2) * 180 / Math.PI + ")");
            };
        }

        setTimeout(donutExplode, duration + delay);
    }

    function donutExplode() {
        var r0a = h / 2 - x.rangeBand() / 2,
            r1a = h / 2,
            r0b = 2 * h - x.rangeBand() / 2,
            r1b = 2 * h,
            arc = d3.svg.arc();

        svg.selectAll("." + goog.getCssName( "symbol" ) + " path")
            .each(transitionExplode);

        function transitionExplode(d, i) {
            d.innerRadius = r0a;
            d.outerRadius = r1a;
            d3.select(this).transition()
                .duration(duration / 2)
                .tween("arc", tweenArc({
                    innerRadius: r0b,
                    outerRadius: r1b
                }));
        }

        function tweenArc(b) {
            return function(a) {
                var path = d3.select(this),
                    text = d3.select(this.nextSibling),
                    i = d3.interpolate(a, b);
                for (var key in b) a[key] = b[key]; // update data
                return function(t) {
                    var a = i(t);
                    path.attr("d", arc(a));
                    text.attr("transform", "translate(" + arc.centroid(a) + ")translate(" + w / 2 + "," + h / 2 +")rotate(" + ((a.startAngle + a.endAngle) / 2 + 3 * Math.PI / 2) * 180 / Math.PI + ")");
                };
            }
        }

        setTimeout(function() {
            svg.selectAll("*").remove();
            svg.selectAll("g").data(symbols).enter().append("g").attr("class", goog.getCssName( "symbol" ) );
            lines();
        }, duration);
    }
};

/**
 * Calling HighChart speed test.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.testHC = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var HCOptions = {

        'exporting': {

            'enabled': true
        },
        'credits': { 'enabled': true},
        'xAxis': { 'title': '' },
        'yAxis': { 'title': '' },
        'title': {

            'text': '',
            'style': {  'display': 'none'  }
        },
        'subtitle': {

            'text': '',
            'style': { 'display': 'none' }
        },
        'tooltip': {

            'enabled': false,
            'followPointer': false
        },
        'chart': {

            'renderTo': mvc.view
        }
    };
    var self = this;
    var chart = new window[ 'Highcharts' ][ 'Chart' ]( HCOptions, function( chart ){

        var startTime = Date.now( );
        var ren = chart[ 'renderer' ];
        for( var i = 0; i < self.testRectNumber_; i++ ){

            ren [ 'rect' ]( i, i, 100, 100, 0 )
                [ 'attr' ]( { 'fill': '#FF0000' } )
                [ 'add' ]( );
        }
        var endTime = Date.now();
        console.log('HighChart time: ' + (endTime - startTime));
    } );
};

/**
 * Calling D3 speed test.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.testD3 = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );

    //Make an SVG Container
    var svgContainer = d3.select( mvc.view ).append( 'svg' )

        .attr( 'width', width )
        .attr( 'height', 400 );

    //Draw the Rectangle
    var startTime = Date.now( );
    for( var i = 0; i < this.testRectNumber_; i++ ){

        svgContainer.append( 'rect' )

            .attr( 'x', i )
            .attr( 'y', i )
            .attr( 'width', 100 )
            .attr( 'height', 100 );
    }
    var endTime = Date.now( );
    console.log( 'D3 time: ' + ( endTime - startTime ) );
};

/**
 * Calling GCL SVG speed test.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.testGclSvg = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var fill = new goog.graphics.SolidFill( 'yellow' );
    var stroke = new goog.graphics.Stroke( 1, 'green' );
    var graphics = new goog.graphics.SvgGraphics( width, 400 );
        graphics.createDom( );

    var startTime = Date.now( );
    for( var i = 0; i < this.testRectNumber_; i++ ){

        graphics.drawRect( i, i, 100, 100, stroke, fill );
    }
    graphics.render( mvc.view );
    var endTime = Date.now( );
    console.log( 'GCL SVG: ' + ( endTime - startTime ) );
};

/**
 * Calling GCL Canvas speed test.
 * @param {zz.mvc.models.WidgetDatarow} widget
 */
zz.mvc.controllers.Widget.prototype.testGclCanvas = function( widget ){

    var uid = this.getModel( ).getUid( ) + ':' + widget.getUid( ) + ':' + this.getModel( ).datafield.data;
    var mvc = zz.environment.services.RAM.getInstance( ).get( uid );
    var width = goog.string.toNumber( goog.style.getComputedStyle( mvc.view, 'width' ).split( 'px' )[ 0 ] );
    var fill = new goog.graphics.SolidFill( 'yellow' );
    var stroke = new goog.graphics.Stroke( 1, 'green' );
    var graphics = new goog.graphics.CanvasGraphics( width, 400 );
        graphics.createDom( );

    var startTime = Date.now( );
    for( var i = 0; i < this.testRectNumber_; i++ ){

        graphics.drawRect( i, i, 100, 100, stroke, fill );
    }
    graphics.render( mvc.view );
    var endTime = Date.now( );
    console.log( 'GCL Canvas: ' + ( endTime - startTime ) );
};

/**
 * Convert scatterplot matrix string to pie chart.
 * @param {string} data
 */
zz.mvc.controllers.Widget.prototype.getPieFromScatterData = function( data ){

    var setosa = 0;
    var versicolor = 0;
    var virginica = 0;
    var total = 0;
    data = JSON.parse( data );
    goog.array.forEach( data, function( item ){

        if( item[ 'species' ] === 'setosa' ){

            setosa ++;
        }
        if( item[ 'species' ] === 'versicolor' ){

            versicolor ++;
        }
        if( item[ 'species' ] === 'virginica' ){

            virginica ++;
        }
    } );
    total = setosa + versicolor + virginica;
    return JSON.stringify( [

        { "species": "setosa", "total": setosa / total },
        { "species": "versicolor", "total": versicolor / total },
        { "species": "virginica", "total": virginica / total }
    ] );
};

/**
 * Retrieve data from server side.
 * @returns {goog.Promise}
 */
zz.mvc.controllers.Widget.prototype.loadTestDataAsText = function( ){

    return ( new goog.Promise( function( resolve, reject ){

        goog.net.XhrIo.send( '/lib/resources/data1.json',

            function( ){

                var data = this.getResponseJson( );
                resolve( JSON.stringify( data.data ) );
            }
        );
    }, this ) );
};